//import { Link } from "react-router-dom"
import { api } from "../../service/Service"
import { useParams } from "react-router-dom"

function AssociarEmpresa(){
    const params = useParams()

    const handleClick = async () => {
        await api.post(`/vagas/associar/${params.id}`)
    }

    return(
        <>
        <button 
        onClick={handleClick}
        className="flex justify-center items-center bg-verde-300 px-8 py-2 rounded-md w-80 text-white
        hover:bg-verde-100">
            Associar-se
        </button>
        </>
    )

}  export default AssociarEmpresa