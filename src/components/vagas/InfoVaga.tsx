import { useContext, useEffect, useState } from "react"
import Vaga from "../../model/Vaga"
import { api } from "../../service/Service"
import { useParams, useNavigate } from "react-router-dom"
import CapaPadrao from '../../assets/images/padraoVagas.png'
import { formatDate } from '../../utils/DateFormat'
import AssociarEmpresa from "../buttons/AssociarEmpresa"

import ArrowLeftIcon from '../../assets/icons/arrow_left.svg'
import { UserContext } from "../../contexts/UserContex"

function InfoVaga(){
    const params = useParams()
    const navigate = useNavigate()
    const [vaga, setVaga] = useState<Vaga>()
    const userLogger = useContext(UserContext)
    const userType = userLogger?.tipo

    useEffect(() => {
        const getVaga = async () => {
            const response = await api.get(`/vagas/info/${params.id}`)
            setVaga(response.data)
        }
        getVaga()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleClick(){
        navigate(-1)
    }
    
    return(
    <>
    {vaga &&
        <div className="flex gap-5 flex-col items-center absolute z-50 w-full h-full bg-white">
            <button
            onClick={handleClick}
            className="flex justify-center items-center bg-cinza-200 rounded-full p-3 absolute top-5 left-5 z-10">
                <img src={ArrowLeftIcon} width={20}/>
            </button>

            <div className="md:hidden">
                <img src={vaga.capa ?? CapaPadrao} alt="Imagem de capa"
                className="w-full absolute top-0"/>

                <div className="flex flex-col gap-3 mt-60 px-4 w-full">
                    <h1 className="text-4xl text-start w-full text-cinza-900 font-bold">{vaga.titulo}</h1>
                    <p className="text-cinza-500">{vaga.sobre}</p>

                    <p className="text-cinza-300 text-xs">Publicado {formatDate(vaga.cadastro)}</p>
                </div>
            </div>
            {/* DESKTOP */}
            <div className="hidden md:flex px-20 py-5 gap-2">
                <div className="flex gap-5 w-3/5">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl text-startll text-cinza-900 font-bold">{vaga.titulo}</h1>
                        <p className="text-cinza-300 text-sm">Publicado {formatDate(vaga.cadastro)}</p>
                        <p className="mt-5 text-cinza-500">{vaga.sobre}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center w-2/5 gap-3">
                    <img src={vaga.capa ?? CapaPadrao} alt="Imagem de capa"
                    className="w-full rounded-md"/>

                    {userType == 'empresas' &&
                        <AssociarEmpresa />
                    }
                </div>
            </div>
        </div>
    }
    </>
    )
}

export default InfoVaga