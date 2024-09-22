import { FaEdit } from "react-icons/fa";

interface TypeProps {
    setButtonAlter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ButtonAlter({ setButtonAlter } : TypeProps){
    return(
        <button onClick={() => setButtonAlter( (prev) => !prev)} className="hover:text-amber-300">
            <FaEdit />
        </button>
    );
}   