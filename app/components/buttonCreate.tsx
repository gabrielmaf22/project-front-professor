import { IoMdPersonAdd } from "react-icons/io";

interface TypeProps {
    setButtonCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonCreate({ setButtonCreate } : TypeProps){    

    return(
        <button onClick={() => setButtonCreate( (prev) => !prev )}
                className="w-2/12 text-white rounded-lg bg-gray-900 flex flex-row items-center p-2 hover:bg-black font-mono">
            <IoMdPersonAdd />
            <span className="ml-6">Adicionar</span>
        </button>
    );
}