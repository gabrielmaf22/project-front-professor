import { IoMdPersonAdd } from "react-icons/io";

export default function ButtonCreate(){    return(

        <button className="w-2/12 text-white rounded-lg bg-gray-900 flex flex-row items-center p-2 hover:bg-black">
            <IoMdPersonAdd />
            <span className="ml-12">Adicionar</span>
        </button>
    );
}