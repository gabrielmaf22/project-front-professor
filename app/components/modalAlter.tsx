import { useState, ChangeEvent } from 'react';
import { RiSendPlane2Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImExit } from "react-icons/im";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TypeProfessor{
    id_professor: number;
    id_titulo: number;
    tx_nome: string;
    tx_sexo: string;
    tx_estado_civil: string;
    dt_nascimento: string;
    tx_telefone: string;
}

interface TypeProps {
    setButtonAlter: React.Dispatch<React.SetStateAction<boolean>>;
    eachProf: TypeProfessor | undefined;
    setEachProf: React.Dispatch<React.SetStateAction<TypeProfessor | undefined>>;
}

export default function ModalAlter({ setButtonAlter, eachProf, setEachProf } : TypeProps){

    const [date, setDate] = useState<Date | null>(null);

    function handleChangeNome(e : ChangeEvent<HTMLInputElement>){
        setEachProf((prev) => ((prev === undefined) ? prev : ({...prev, tx_nome: e.target.value,})));
    }

    function handleChangeNascimento(date : Date | null){
        setEachProf((prev) => ((prev === undefined) ? prev : ({...prev, dt_nascimento: (
            (date === null) 
            ? ""
            : new Date(date).toLocaleDateString('pt-BR')),})));
        setDate(date);
    }

    function handleChangeTelefone(e : ChangeEvent<HTMLInputElement>){
        setEachProf((prev) => ((prev === undefined) ? prev : ({...prev, tx_telefone: e.target.value,})));
    }   
 

    return(
        <>
            <div className="bg-black bg-opacity-10 w-screen h-screen z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={() => setButtonAlter( (prev) => !prev)}/>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-[800px] h-[600px] bg-gray-900 text-white z-10 rounded-[16px]">
                    <form className="w-full h-full flex flex-row pl-8 pt-8">
                        <div className="w-10/12 flex flex-col">
                            <label className="mt-8 font-mono">Nome</label>
                            <input type="text" value={(eachProf === undefined) ? "" : eachProf.tx_nome}
                                    onChange={(e) => handleChangeNome(e)}


                                    name="nome" placeholder="Digite seu nome"
                                    className="w-10/12 text-black pl-2 pr-2 rounded-lg bg-gray-300 focus:outline-none"/>
                            <span className="mt-12 font-mono">Sexo</span> 
                            <div className="w-10/12 flex flex-row ml-4 mt-2">
                                <div className="flex flex-reverse mr-10">
                                    <label className="mr-1 text-sm">Masculino</label>
                                    <input type="radio" name="sexo"/>
                                </div>
                                <div className="flex flex-reverse">
                                    <label className="mr-1 text-sm">Feminino</label>
                                    <input type="radio" name="sexo"/>
                                </div>  
                            </div>
                            <span className="mt-12 font-mono">Estado Civil</span> 
                            <div className="w-10/12 flex flex-row ml-4 mt-2">
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Solteiro(a)</label>
                                    <input type="radio" name="civil"/>
                                </div>
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Casado(a)</label>
                                    <input type="radio" name="civil"/>
                                </div>
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Divorciado(a)</label>
                                    <input type="radio" name="civil"/>
                                </div>
                            </div>
                            <label className="mt-12 font-mono">Data Nascimento</label>
                            <div className="text-black">
                                <DatePicker
                                    selected={date}
                                    value={(eachProf === undefined) ? "" : eachProf.dt_nascimento}
                                    onChange={(date: Date | null) => handleChangeNascimento(date)}
                                    className="w-[350px] text-black bg-gray-300 rounded-lg pl-2 font-mono"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <label className="mt-12 font-mono">Telefone</label>
                            <input type="text" value={(eachProf === undefined) ? "" : eachProf.tx_telefone}
                                    onChange={(e) => handleChangeTelefone(e)}
                                    name="telefone" placeholder="Digite seu telefone"
                                    className="w-10/12 text-black pl-2 pr-2 rounded-lg bg-gray-300 focus:outline-none"/>
                        </div>
                        <div className="w-full flex flex-col items-center justify-around border-l-2 border-gray-300">
                            <button className="w-5/12 flex flex-row items-center rounded-lg p-2 bg-gray-700 border-2 border-gray-300">
                                <RiSendPlane2Fill/>
                                <span className="ml-8 font-mono">Enviar</span>
                            </button>

                            <button className="w-5/12 flex flex-row items-center rounded-lg p-2 bg-gray-700 border-2 border-gray-300">
                                <RiDeleteBin5Line/>
                                <span className="ml-8 font-mono">Deletar</span>
                            </button>                   

                            <button className="w-5/12 flex flex-row items-center rounded-lg p-2 bg-gray-700 border-2 border-gray-300">
                                <ImExit />
                                <span className="ml-8 font-mono">Retornar</span>
                            </button>          
                            
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
}   