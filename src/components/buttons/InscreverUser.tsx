//import { Link } from "react-router-dom"
import { api } from "../../service/Service"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify';

function IncreverUser(){
    const params = useParams()

    const handleClick = async () => {
        try {
            await api.post(`/vagas/inscricao/${params.id}`)

            toast.success('Inscrito!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                location.reload()         
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <button
            onClick={handleClick}
            className="flex justify-center items-center bg-verde-300 px-8 py-2 rounded-md w-72 md:w-80 text-white
            hover:bg-verde-300/80">
            Inscrever-se
        </button>
        </>
    )

}  export default IncreverUser