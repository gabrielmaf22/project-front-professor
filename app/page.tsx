'use client'

import { useState, useEffect } from 'react';

import ButtonAlter from './components/buttonAlter';
import ButtonDelete from './components/buttonDelete';
import ButtonCreate from './components/buttonCreate';

import LoadingSpinner from './components/loadingSpinner';
import ModalCreate from './components/modalCreate';
import ModalAlter from './components/modalAlter';

interface TypeProfessor{
  id_professor: number;
  id_titulo: number;
  tx_nome: string;
  tx_sexo: string;
  tx_estado_civil: string;
  dt_nascimento: string;
  tx_telefone: string;
}

export default function Home(){

  const [ professor, setProfessor ] = useState<TypeProfessor[]>([]);
  const [ eachProf, setEachProf ] = useState<TypeProfessor | undefined>(undefined);
  const [ spinner, setSpinner ] = useState<boolean>(true);

  const [ buttonDelete, setButtonDelete ] = useState<boolean>(false);
  const [ buttonCreate, setButtonCreate ] = useState<boolean>(false);
  const [ buttonAlter, setButtonAlter ] = useState<boolean>(false);

  useEffect( () => {
    const getData = async() => {
      try{
          const response = await fetch("http://localhost:3003/professor");
          
          if(!response.ok)
            throw new Error(`Response status: ${response.status}`);

          
          const data: TypeProfessor[] = await response.json();
          
          const dataFix = data
            .map( (prof) => {
              let estadoCivil: string;
              
              switch (prof.tx_estado_civil){
                case 'c':
                  estadoCivil = 'Casado(a)';
                  break;
                case 's':
                  estadoCivil = 'Solteiro(a)';
                  break;
                case 'd':
                  estadoCivil = 'Divorciado(a)';
                  break;
                default:
                  estadoCivil = '';
                  break;
              }

              return {
                ...prof,
                dt_nascimento: new Date(prof.dt_nascimento).toLocaleDateString('pt-BR'),
                tx_estado_civil: estadoCivil
              };
            })
            .sort( (a, b) => { 
              if (a.tx_nome < b.tx_nome)  return -1;
              if (a.tx_nome > b.tx_nome)  return 1;
              return 0;
            })
          setProfessor(dataFix);
          setSpinner(false);

      } catch ( err : unknown){
        if ( err instanceof Error )
          console.log('Failed to fetch data: ', err.message);
        else
          console.log('Failed to fetch data: unknown error');
        } 
    } 
    getData();
  }, [buttonDelete, buttonCreate, buttonAlter]);
  
  return(
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-full m-8 p-4 flex bg-gray-500 flex flex-row">
        <div className="w-1/2 overflow-auto">
          <h1 className="w-4/12 ml-24 text-4xl font-serif text-gray-200 tracking-widest bg-gray-900">PROFESSORES</h1>
        </div>
        <div className="w-1/2 flex justify-end overflow-auto mr-24">
          <ButtonCreate setButtonCreate={setButtonCreate}/>
          {buttonCreate && <ModalCreate setButtonCreate={setButtonCreate}/>}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
      { spinner && <LoadingSpinner/> }
        <table>
          <thead>
            <tr className="text-gray-300">
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-48 pr-48 tracking-widest">Nome</th>
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-16 pr-16 tracking-widest">Estado Civil</th>
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-16 pr-16 tracking-widest">Data Nascimento</th>
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-32 pr-32 tracking-widest">Telefone</th>
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-16 pr-16 tracking-widest">Alterar</th>
              <th scope="col" className="border border-gray-400 bg-gray-900 pt-2 pb-2 pl-16 pr-16 tracking-widest">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {professor
              .map( (prof) => 
                <tr key={prof.id_professor} className="text-white font-mono">
                  <td className="p-4 border border-gray-400 bg-gray-800 hover:bg-black">{prof.tx_nome}</td>
                  <td className="p-4 text-center border border-gray-400 bg-gray-800 hover:bg-black">{prof.tx_estado_civil}</td>
                  <td className="p-4 text-center border border-gray-400 bg-gray-800 hover:bg-black tracking-widest">{prof.dt_nascimento}</td>
                  <td className="p-4 text-center border border-gray-400 bg-gray-800 hover:bg-black tracking-widest">{prof.tx_telefone}</td>
                  <td className="p-4 border border-gray-400 bg-gray-800 text-center hover:bg-black">
                    <ButtonAlter prof={prof} setEachProf={setEachProf} setButtonAlter={setButtonAlter}/>
                  </td>
                  <td className="p-4 border border-gray-400 bg-gray-800 text-center hover:bg-black">
                    <ButtonDelete id={prof.id_professor} setProfessor={setProfessor} 
                                  setButtonDelete={setButtonDelete} setSpinner={setSpinner}/>
                  </td>
                </tr>)}
          </tbody>
        </table>
        {buttonAlter && <ModalAlter setButtonAlter={setButtonAlter} eachProf={eachProf} setEachProf={setEachProf} />}
      </div>
    </div>  
  );
}
