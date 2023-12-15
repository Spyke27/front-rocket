//import { Link } from "react-router-dom"
import { api } from "../../service/Service"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify';

function RemoveAssociacao(){
    const params = useParams()

    const handleClick = async () => {
        try {
            await api.delete(`/vagas/deletar/inscricao/${params.id}`)

            toast.success('Inscrição removida!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });     
                setTimeout(() => {
                    location.reload()
                }, 2000)       
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <button
            onClick={handleClick}
            className="flex justify-center items-center bg-verde-300 px-8 py-2 rounded-md w-72 md:w-80 text-white
            hover:bg-verde-300/80">Remover inscrição
        </button>
        </>
    )

}  export default RemoveAssociacao