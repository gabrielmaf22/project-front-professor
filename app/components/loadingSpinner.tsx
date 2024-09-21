import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner(){
    return(
        <span className="text-white">
            <button className="animate-spin hover:text-red-700 mt-2 mb-10 mr-4" disabled>
                <AiOutlineLoading3Quarters /> 
            </button>
            Processando ...      
        </span>
    );
}