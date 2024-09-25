import { RiDeleteBin5Line } from "react-icons/ri";

interface TypeProfessor{
    id_professor: number;
    id_titulo: number;
    tx_nome: string;
    tx_sexo: string;
    tx_estado_civil: string;
    dt_nascimento: string;
    tx_telefone: string;
  }

interface TypeProps{
    id: number;
    setProfessor: React.Dispatch<React.SetStateAction<TypeProfessor[]>>;
    setButtonDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setSpinner: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonDelete({ id, setProfessor, setButtonDelete, setSpinner} : TypeProps){

    function handleClick(){

        const deleteData = async () => {

            try{
                const response = await fetch (`http://localhost:3003/professor/${id}`, {
                   method: "DELETE",
                });
                
                if(!response.ok)
                    throw new Error('Network response was not ok');

            } catch ( err : unknown ){
                if ( err instanceof Error ) 
                    console.log('Failed to fetch data: ', err.message);
                else 
                    console.log('Failed to fetch data: error unknown');           
            } 
        }

        deleteData();

        setProfessor( (prev) =>
            prev
                .filter( (prof) => prof.id_professor != id )
                .map( (prof) => prof));
         
        setButtonDelete( (prev) => !prev );
        setSpinner( (prev) => !prev);
    }

    return(
        <button onClick={handleClick} className="hover:text-red-700">
            <RiDeleteBin5Line/>
        </button>        
    );
}