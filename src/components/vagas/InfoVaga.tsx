/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Vaga from "../../model/Vaga"
import { api } from "../../service/Service"
import { useParams, useNavigate, Link } from "react-router-dom"
import { formatDate, formatDateTime, convertHour } from '../../utils/DateFormat'
import AssociarEmpresa from "../buttons/AssociarEmpresa"
import SendMessage from "../buttons/SendMessage"
import { UserContext } from "../../contexts/UserContex"

import CapaPadrao from '../../assets/images/padraoVagas.png'
import CalendarIcon from '../../assets/icons/calendar.svg'
import ClockIcon from '../../assets/icons/clock.svg'
import MapIcon from '../../assets/icons/map.svg'
import ArrowLeftIcon from '../../assets/icons/arrow_left.svg'
import HandIcon from '../../assets/icons/hand.svg'
import RemoveAssociacao from "../buttons/removeAssociacao"

function InfoVaga(){
    const params = useParams()
    const navigate = useNavigate()
    const [vaga, setVaga] = useState<Vaga>()
    const userLogger = useContext(UserContext)
    const userType = userLogger?.tipo
    const [associado, setAssociado] = useState(false)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const getAssociado = async () => {
            const response = await api.get(`/vagas/verificar/empresa/${params.id}`)
            if(response.data){
                setAssociado(true)
            }
        }
        getAssociado()
    }, [])
    
    useEffect(() => {
        const getVaga = async () => {
            const response = await api.get(`/vagas/info/${params.id}`)
            setVaga(response.data)
            setNome(response.data.ong_id ? response.data.Ong.nome : response.data.Empresas[0].nome)
            setEmail(response.data.ong_id ? response.data.Ong.email : response.data.Empresas[0].email)
        }
        getVaga()
    }, [])

    function handleClick(){navigate(-1)}
    
    return(
    <>
    {vaga &&
        <div className="flex gap-5 flex-col relative w-full h-full bg-white">
            <button
            onClick={handleClick}
            className="flex justify-center items-center bg-cinza-200 rounded-full p-3 absolute top-5 left-5 z-10">
                <img src={ArrowLeftIcon} width={20}/>
            </button>
            {/* MOBILE */}
            <div className="md:hidden pt-60 flex flex-col items-center gap-5">
                <img src={vaga.capa ?? CapaPadrao} alt="Imagem de capa"
                className="w-full absolute top-0 h-58"/>

                <span className="flex gap-2 py-2 px-4 bg-white rounded-full absolute right-5 top-44">
                    <p className="text-xs text-laranja-300">Vagas {vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                    <img src={HandIcon} alt="qtd_volun" />
                </span>

                <div className="flex flex-col px-4 w-full">
                    <h1 className="text-4xl text-start w-full text-cinza-900 font-bold">{vaga.titulo}</h1>
                    <div className="flex gap-10">
                    <p className="text-cinza-300 text-xs mt-1 mb-3">Publicado em {formatDate(vaga.cadastro!)} </p>
                    <Link to={`/empresas/info/${vaga.empresa_id ?? vaga.ong_id}`}>
                        <p className="text-sm text-cinza-900 underline">
                            Por: {nome}
                        </p>
                    </Link>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <div className="text-xs text-cinza-100 px-2 py-0.5 bg-laranja-200 rounded-full">
                            {vaga.Causa?.nome}
                        </div>
                        <div className="text-xs text-cinza-100 px-2 py-0.5 bg-azul-200 rounded-full">
                            {vaga.Odss?.nome}
                        </div>
                    </div>

                    {userType == 'empresas' &&
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {!associado && <AssociarEmpresa />}
                            {associado && <RemoveAssociacao />}
                            <SendMessage 
                            email={email} />
                        </div>
                    </div>
                    }

                    <h2 className="mt-4 text-cinza-900 text-xl font-bold">Descrição da Ação:</h2>
                    <p className="text-cinza-500 mt-1 mb-10">{vaga.sobre}</p>
                    <hr />

                    <h2 className="mt-4 text-cinza-900 text-xl font-bold mb-4">Data e Horário:</h2>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex gap-2 items-center">
                            <img src={CalendarIcon} width={20} />
                            <p className="text-cinza-900">{formatDate(vaga.data)} às {formatDateTime(vaga.data)}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <img src={ClockIcon} width={20} />
                            <p className="text-cinza-900">Carga horária: {convertHour(vaga.duracao)}</p>
                        </div>
                    </div>
                    <hr />

                    <h2 className="mt-4 text-cinza-900 text-xl font-bold mb-4">Endereço:</h2>
                    <div className="flex gap-2 items-center mb-10">
                        <img src={MapIcon} width={20} />
                        <p className="text-cinza-900">{vaga.rua}, {vaga.bairro} - {vaga.cidade}, {vaga.estado} <br />
                        CEP: {vaga.cep}</p>
                    </div>
                </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex px-20 py-5 gap-2">

            <div className="flex flex-col gap-5 w-3/5 pr-10">
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl text-cinza-900 font-bold">{vaga.titulo}</h1>
                    <p className="text-cinza-300 text-sm">Publicado em {formatDate(vaga.cadastro!)}</p>
                    <div className="flex gap-5 justify-end">
                        <div className="text-sm text-cinza-100 px-3 py-1 bg-laranja-200 rounded-full">
                            {vaga.Causa?.nome}
                        </div>
                        <div className="text-sm text-cinza-100 px-3 py-1 bg-azul-200 rounded-full">
                            {vaga.Odss?.nome}
                        </div>
                    </div>
                    <p className="text-cinza-500">{vaga.sobre}</p>
                </div>

                <hr className="text-cinza-300 border my-4" />
                
                <div className="flex flex-col gap-2 mb-4">
                    <h2 className="mt-4 text-cinza-900 text-xl font-bold mb-4">Data e Horário:</h2>
                    <div className="flex gap-5 items-center">
                        <img src={CalendarIcon} width={40} />
                        <p className="text-cinza-900">{formatDate(vaga.data)} às {formatDateTime(vaga.data)}</p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <img src={ClockIcon} width={40} />
                        <p className="text-cinza-900">Carga horária: {convertHour(vaga.duracao)}</p>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="mt-4 text-cinza-900 text-xl font-bold mb-4">Endereço:</h2>
                    <div className="flex gap-5 items-center mb-10">
                        <img src={MapIcon} width={40} />
                        <p className="text-cinza-900">{vaga.rua}, {vaga.bairro} - {vaga.cidade}, {vaga.estado} <br />
                                CEP: {vaga.cep}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center w-2/5 gap-3">
                <img src={vaga.capa ?? CapaPadrao} alt="Imagem de capa"
                className="w-full rounded-md h-64"/>

            <Link to={`/empresas/info/${vaga.empresa_id ?? vaga.ong_id}`}>
                <p className="text-lg text-cinza-900 text-center hover:underline">
                    Por: {nome}
                </p>
            </Link>

                {userType == 'empresas' &&
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {!associado && <AssociarEmpresa />}
                            {associado && <RemoveAssociacao />}
                            <SendMessage 
                            email={`${email}`} />
                        </div>

                        <div className="flex justify-center items-center gap-5 bg-laranja-300/90 py-3 px-10 rounded-md">
                            <p className="text-white">Vagas disponíveis: </p>
                            <span className="flex gap-2 py-2 px-4 bg-white rounded-full">
                                <p className="text-xs text-laranja-300">{vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                                <img src={HandIcon} alt="qtd_volun" />
                            </span>
                        </div>
                    </div>
                }
            </div>

        </div>
    </div>
    }
    </>
    )
}

export default InfoVaga