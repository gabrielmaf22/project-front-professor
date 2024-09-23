import { FaEdit } from "react-icons/fa";


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
    setEachProf: React.Dispatch<React.SetStateAction<TypeProfessor | undefined>>;
    prof: TypeProfessor;
}

export default function ButtonAlter({ setButtonAlter, setEachProf, prof } : TypeProps){
    
    function handleClick(){
        setButtonAlter( (prev) => !prev );
        setEachProf(prof);
    }
 
    return(
        <button onClick={handleClick} className="hover:text-amber-300">
            <FaEdit />
        </button>
    );
}   