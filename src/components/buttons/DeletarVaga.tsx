//import { Link } from "react-router-dom"
import { api } from "../../service/Service"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import TrashIcon from '../../assets/icons/trash.svg'
import { useState } from "react";

function DeletarVaga(){
    const params = useParams()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)

    const confirmar = async () => {
        try {
            navigate(-1)
            toast.success('Ação excluída!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
                await api.delete(`/deletar/vaga/${params.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModal(false);
    }
    const handleClick = async () => {
        setModal(true)
    }

    return(
        <>
        {modal &&
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-black/80 fixed top-0 left-0 z-50">
            <div className="flex flex-col relative justify-center items-center p-10 bg-cinza-100 rounded-md w-96">
                <button onClick={cancelar} className="absolute top-3 right-5 font-bold">X</button>
                <p className="text-lg text-cinza-900 mb-2">Deseja excluir está ação?</p>
                <p className="text-xs text-laranja-500 text-center">Atenção! A exclusão será irreversível e todos os dados serão apagados permanentemente.</p>
                <div className="flex gap-5 mt-8">
                    <button 
                    onClick={confirmar}
                        className="px-6 py-2 bg-laranja-500/80 hover:bg-laranja-500 text-cinza-100 rounded-md">Confirmar
                    </button>

                    <button 
                        onClick={cancelar}
                        className="px-6 py-2 border rounded-md 
                        hover:border-cinza-200 hover:bg-cinza-200 hover:text-white">Cancelar
                    </button>
                </div>
            </div>
        </div>
        }
        <button
            onClick={handleClick}
            className="flex justify-center items-center gap-2 bg-laranja-500/90 px-8 py-2 md:py-2.5 rounded-md w-1/2 text-white
            hover:bg-laranja-500">
                Deletar
                <img src={TrashIcon} width={15} />
        </button>
        </>
    )

}  export default DeletarVaga