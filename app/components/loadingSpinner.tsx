import { FaHourglassEnd } from "react-icons/fa6";

export default function LoadingSpinner(){
    return(
        <span className="text-white">
            <button className="animate-spin hover:text-red-700 mt-2 mb-10 mr-4" disabled>
                <FaHourglassEnd />
            </button>
            Processando ...      
        </span>
    );
}