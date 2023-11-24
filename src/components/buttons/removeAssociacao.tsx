//import { Link } from "react-router-dom"
import { useState } from "react";
import { api } from "../../service/Service"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify';

function RemoveAssociacao(){
    const params = useParams()
    const [text, setText] = useState('Remover ação')

    const handleClick = async () => {
        try {
            await api.delete(`/vagas/deletar/associacao/${params.id}`)
            setText('Associar-se')

            toast.success('Ação removida!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });            
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
            {text}
        </button>
        </>
    )

}  export default RemoveAssociacao