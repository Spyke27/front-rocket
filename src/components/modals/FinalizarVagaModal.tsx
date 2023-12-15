import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../service/Service"
import User from "../../model/User"
import { toast } from 'react-toastify';

import ConfirmWhite from '../../assets/icons/confirmWhite.svg'
import ConfirmGreen from '../../assets/icons/confirmGreen.svg'

type Props = {
    tempo: number;
}

function FinalizarVagaModal(props: Props){
    const params = useParams()
    const [voluntarios, setVoluntarios] = useState<User[]>([])
    const [showConfirmar, setShowConfirmar] = useState(false)
    const [id, setID] = useState(0)
    const [confirmados, setConfirmados] = useState<number[]>([])

    useEffect(() => {
        const getVoluntarios = async () => {
            const response = await api.get(`/vaga/voluntarios/${params.id}`)
            setVoluntarios(response.data.Users)
        }
        getVoluntarios()
    },[params.id])

    
    const handleClick = async () => {
        try {
            await api.post(`/vaga/finalizar/${params.id}`)

            toast.success('Ação finalizada!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

                setTimeout(function teste(){
                    location.reload(); 
                }, 1500)

        } catch (error) {
            console.log(error)
        }
    }

    return (
    <>
    <div className="flex justify-center items-center z-40 fixed top-0 left-0 w-screen h-screen bg-black/90">

        {voluntarios.length > 0 && 
            <div className="flex relative justify-center items-center flex-col p-10 md:py-12  gap-2 bg-cinza-600">
                <button onClick={() => location.reload()}
                    className="w-10 h-10 text-white absolute top-3 right-3 z-50 font-bold text-2xl">
                        X
                </button>
                <h2 className="text-white text-xl">Voluntários</h2>
                <p className="text-white text-sm mb-3">Confirme os presentes:</p>
                <div className="flex w-full text-white gap-1 px-1">
                    <p className="ml-10">Nome</p>
                    <p className="ml-28">Email</p>
                    <p className="ml-40">Empresa</p>
                </div>
                {voluntarios.map((voluntario) => (
                    <div key={voluntario.id}
                    className="flex w-full border-white items-center">
                        <button
                            className="w-10 h-10"
                            onClick={() => {
                                if(!confirmados.includes(voluntario.id)){
                                    setShowConfirmar(true)
                                    setID(voluntario.id)
                                }
                            }}>
                            <img src={confirmados.includes(voluntario.id)?ConfirmGreen:ConfirmWhite} width={30}/>
                        </button>

                        {showConfirmar && 
                            <div className="flex flex-col justify-center items-center absolute left-1/3 top-1/3 bg-cinza-100 p-5 gap-2">
                                <p className="">CONFIRMAR PRESENÇA</p>
                                <div className="flex gap-2">
                                    <button 
                                        className="px-3 py-1 bg-cinza-600 text-verde-200 rounded-md"
                                        onClick={async () => {
                                            toast.success(`Presença confirmada!`, {
                                                position: "top-center",
                                                autoClose: 1200,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                            });
                                            console.log(confirmados)

                                            setShowConfirmar(false)
                                            const newId = id;
                                            const newItems = [...confirmados, newId];
                                            setConfirmados(newItems)
                                            
                                            await api.post(`/vaga/presenca/${id}`, { tempo: props.tempo})
                                        }}>
                                            Confirmar
                                    </button>
                                    
                                    <button 
                                    onClick={() => setShowConfirmar(false)}
                                        className="px-3 py-1 bg-cinza-600 text-laranja-500 rounded-md">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        }

                        <div className="flex gap-1 w-40 border border-white pl-1 py-3">
                            <p className="text-white">{voluntario.nome}</p>
                            <p className="text-white">{voluntario.sobrenome}</p>
                        </div>
                        <p className="text-white w-52 border border-white pl-1 py-3">{voluntario.email}</p>
                        <p className="text-white w-20 border border-white pr-3 pl-1 py-3">{voluntario.empresa_id}</p>
                    </div>
                ))}
                <button
                    onClick={handleClick}
                    className="flex justify-center items-center bg-azul-200 rounded-md text-white
                    hover:bg-azul-200/80 w-full py-2 mt-3">Finalizar Ação
                </button>
            </div>
        }

    </div>
    </>
    )
}

export default FinalizarVagaModal

