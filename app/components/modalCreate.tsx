import { useState, FormEvent } from 'react';
import { RiSendPlane2Fill } from "react-icons/ri";
import { ImExit } from "react-icons/im";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface TypeProps {
    setButtonCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalCreate({ setButtonCreate } : TypeProps){

    const [date, setDate] = useState<Date | null>(null);

    async function handleSubmit( e : FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget); 
        const data = Object.fromEntries(formData.entries());
    
        async function postData(){
            try{
                const response = await fetch('http://localhost:3003/professor', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        tx_nome: data.nome,
                        tx_sexo: data.sexo,
                        tx_estado_civil: data.civil,
                        dt_nascimento: (date !== null) ? date.toLocaleDateString('pt-BR') : "",
                        tx_telefone: data.telefone

                    })
                });
                
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`);
                }
            } catch ( err : unknown ){
                if ( err instanceof Error )
                    console.log('Failed to post data: ', err.message);
                else
                    console.log('Failed to post data: unknown error');
            }
        }
        await postData();
        setButtonCreate( (prev) => !prev);
    }

    return(
        <>
            <div className="bg-black bg-opacity-50 w-screen h-screen z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={() => setButtonCreate( (prev) => !prev)}/>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-[800px] h-[600px] bg-gray-900 text-white z-10 rounded-[16px]">
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full h-full flex flex-row pl-8 pt-8">
                        <div className="flex flex-col">
                            <label className="mt-8 font-mono">Nome</label>
                            <input type="text" name="nome" placeholder="Digite seu nome"
                                    className="w-10/12 text-black pl-2 pr-2 rounded-lg bg-gray-300 focus:outline-none"/>
                            <span className="mt-12 font-mono">Sexo</span> 
                            <div className="w-10/12 flex flex-row ml-4 mt-2">
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Masculino</label>
                                    <input type="radio" name="sexo" value="m"/>
                                </div>
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Feminino</label>
                                    <input type="radio" name="sexo" value="f"/>
                                </div>  
                            </div>
                            <span className="mt-12 font-mono">Estado Civil</span> 
                            <div className="w-10/12 flex flex-row ml-4 mt-2">
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Solteiro(a)</label>
                                    <input type="radio" name="civil" value="s"/>
                                </div>
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Casado(a)</label>
                                    <input type="radio" name="civil" value="c"/>
                                </div>
                                <div className="flex flex-reverse mr-6">
                                    <label className="mr-1 text-sm">Divorciado(a)</label>
                                    <input type="radio" name="civil" value="d"/>
                                </div>
                            </div>
                            <label className="mt-12 font-mono">Data Nascimento</label>
                            <div className="text-black">
                                <DatePicker
                                    selected={date}
                                    onChange={(date: Date | null) => setDate(date)}
                                    className="w-[300px] text-black bg-gray-300 rounded-lg pl-2 font-mono"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <label className="mt-12 font-mono">Telefone</label>
                            <input type="text" name="telefone" placeholder="Digite seu telefone"
                                    className="w-10/12 text-black pl-2 pr-2 rounded-lg bg-gray-300 focus:outline-none"/>
                        </div>
                        <div className="w-full flex flex-col items-center justify-around border-l-2 border-gray-300">
                            <button type="submit"
                                className="w-5/12 flex flex-row items-center rounded-lg p-2 bg-gray-700 border-2 border-gray-300">
                                <RiSendPlane2Fill/>
                                <span className="ml-8 font-mono">Enviar</span>
                            </button>

                            <button onClick={(e) => {
                                    e.preventDefault();
                                    setButtonCreate( (prev) => !prev);
                                }} 
                                className="w-5/12 flex flex-row items-center rounded-lg p-2 bg-gray-700 border-2 border-gray-300">
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