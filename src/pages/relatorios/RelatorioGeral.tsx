import { useContext, useEffect, useState } from "react"
import { api } from "../../service/Service"
import RelatorioGeral from "../../model/RelatorioGeral"
import { convertHour } from "../../utils/DateFormat"
import Voltar from "../../components/buttons/Voltar"
import { UserContext } from "../../contexts/UserContex"
import { useNavigate } from "react-router-dom"

import fileIcon from '../../assets/icons/downloadFiler.svg'

function RelatorioGeralAdm(){
    const [relatorio, setRelatorio] = useState<RelatorioGeral>()
    const userLogged = useContext(UserContext)
    const [authAdm, setAuthAdm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(Number(userLogged?.id) == 75017){
            setAuthAdm(true)
        }
        else {
            navigate(-1)
        }
    }, [navigate, userLogged?.id])

    useEffect(() => {
        const getRelatorioGeral = async () => {
            if(userLogged?.id){
                const response = await api.get(`/geral/relatorio`)
                setRelatorio(response.data)
            } else{
                navigate(-1)
            }
        }
        getRelatorioGeral()
    }, [navigate, userLogged?.id])

    return(
    <>
    {authAdm && 
        <div className="flex flex-col items-center bg-cinza-600 w-full p-10 relative">
        <Voltar />
            <h1 className="text-5xl text-cinza-100 text-center">Painel Geral</h1>
            <p className="text-base text-cinza-100 text-center mt-3">
                <span className="text-laranja-500">Atenção! </span>Este relatório apresenta somente ações que já foram finalizadas.
            </p>

            <div className="flex w-full mt-10 gap-5">
                <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Ações Finalizadas</p>
                    <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 rounded-full p-3">
                        <div className="flex justify-center items-center rounded-full p-14 bg-cinza-600">
                            <span className="text-cinza-100 text-4xl text-center">{relatorio?.vagas}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Tempo de Ação</p>
                    <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 rounded-full p-3">
                        <div className="flex justify-center items-center rounded-full p-14 bg-cinza-600">
                            <span className="text-cinza-100 text-4xl text-center">
                                {relatorio?.tempoVoluntariado? convertHour(relatorio.tempoVoluntariado) : "00:00"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Pessoas Impactadas</p>
                    <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 rounded-full p-3">
                        <div className="flex justify-center items-center rounded-full p-14 bg-cinza-600">
                            <span className="text-cinza-100 text-4xl text-center">{relatorio?.pessoasImpactadas}</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border w-full text-cinza-100 mt-16 mb-10"/>

            <div className="flex flex-col justify-center items-center rounded-md py-5 text-cinza-100 w-full
            bg-black/70">
                <h2 className="text-4xl">Número de cadastros:</h2>
                <div className="flex justify-between p-10 gap-10">
                    <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                        <p className="text-cinza-100 text-3xl">Empresas</p>
                        <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1">
                            <div className="flex justify-center items-center px-10 py-1 bg-cinza-600">
                                <span className="text-cinza-100 text-5xl text-center">{relatorio?.empresas}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                        <p className="text-cinza-100 text-3xl">Voluntários</p>
                        <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1">
                            <div className="flex justify-center items-center px-10 py-1 bg-cinza-600">
                                <span className="text-cinza-100 text-5xl text-center">{relatorio?.usuarios}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                        <p className="text-cinza-100 text-3xl">Instituições</p>
                        <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1">
                            <div className="flex justify-center items-center px-10 py-1 bg-cinza-600">
                                <span className="text-cinza-100 text-5xl text-center">{relatorio?.instituicoes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border w-full text-cinza-100 mt-16 mb-10"/>

            <div className="flex flex-col justify-center items-center rounded-md py-10 text-cinza-100 w-full
            bg-black/70 gap-5">
                <h2 className="text-4xl">Classificações mais engajadas:</h2>
                <div className="flex items-start gap-5 w-full md:px-10">

                    <div className="flex flex-col w-1/3 justify-center items-center gap-1">
                        <p className="text-cinza-100 text-3xl">Causa</p>
                        {relatorio?.rankCausas.map((causa, i) => (
                            <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1 w-full">
                                <div className="flex relative justify-center items-center px-5 py-2 bg-black/90">
                                    <span className="text-cinza-100 text-2xl text-center">{causa}</span>
                                    <span className="absolute -left-5 z-30 flex items-center justify-center bg-cinza-900 rounded-full text-base font-bold px-3 py-2 border-2 border-verde-300">{i + 1 +"°"}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col w-1/3 justify-center items-center gap-1">
                        <p className="text-cinza-100 text-3xl">ODS</p>
                        {relatorio?.rankOds.map((ods, i) => (
                            <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1 w-full">
                                <div className="flex relative justify-center items-center px-5 py-2 bg-black/90">
                                    <span className="text-cinza-100 text-2xl text-center">{ods}</span>
                                    <span className="absolute -left-5 z-30 flex items-center justify-center bg-cinza-900 rounded-full text-base font-bold px-3 py-2 border-2 border-verde-300">{i + 1 +"°"}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col w-1/3 justify-center items-center gap-1">
                        <p className="text-cinza-100 text-3xl">Política Pública</p>
                        {relatorio?.rankPoliticas.map((politica, i) => (
                            <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 p-1 w-full">
                                <div className="flex relative justify-center items-center px-5 py-2 bg-black/90">
                                    <span className="text-cinza-100 text-2xl text-center">{politica}</span>
                                    <span className="absolute -left-5 z-30 flex items-center justify-center bg-cinza-900 rounded-full text-base font-bold px-3 py-2 border-2 border-verde-300">{i + 1 +"°"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="flex justify-center items-center gap-3 w-52 bg-verde-300 py-2 px-5 text-cinza-100 rounded-md mt-10">
                Baixar Relatório
                <img src={fileIcon} width={20} />
            </button>
        </div>
    }
    </>
    )
}

export default RelatorioGeralAdm