import { useContext, useEffect, useState } from "react"
import { api } from "../../service/Service"
import { useParams, useNavigate } from "react-router-dom"
import Empresa from "../../model/Empresa"
import Relatorio from "../../model/Relatorio"
import { convertHour } from "../../utils/DateFormat"
import Voltar from "../../components/buttons/Voltar"
import { UserContext } from "../../contexts/UserContex"

import fileIcon from '../../assets/icons/downloadFiler.svg'

function RelatorioEmpresa(){
    const [relatorio, setRelatorio] = useState<Relatorio>()
    const [empresa, setEmpresa] = useState<Empresa>()
    const userLogged = useContext(UserContext)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getRelatorio = async () => {
            if(params.id == userLogged?.id){
                const response = await api.get(`/relatorio`)
                setRelatorio(response.data)
            } else{
                navigate(-1)
            }
        }
        getRelatorio()
    }, [navigate, params.id, userLogged?.id])

    useEffect(() => {
        async function getEmpresa(){
            const response = await api.get(`/empresas/id/${params.id}`)
            setEmpresa(response.data)
        }
        getEmpresa()
    }, [params.id])

    return(
    <>
    <div className="flex flex-col items-center bg-cinza-600 w-full p-10 relative">
        <Voltar />
        <h1 className="text-5xl text-cinza-100 text-center">{empresa?.nome}</h1>
        <p className="text-base text-cinza-100 text-center mt-3">
            Relatório de <span className="text-verde-300">{relatorio?.qtdVagas}</span> ações associadas
        </p>

        <div className="flex w-full mt-10 gap-5">
            <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                <p className="text-cinza-100 text-2xl">Voluntários</p>
                <div className="bg-gradient-to-r from-roxo-500 to-roxo-200 rounded-full p-3">
                    <div className="flex justify-center items-center rounded-full p-14 bg-cinza-600">
                        <span className="text-cinza-100 text-4xl text-center">{relatorio?.usuariosCadastrados}</span>
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
                        <span className="text-cinza-100 text-4xl text-center">
                            {relatorio?.pessoasImpactadas}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <hr className="border w-full text-cinza-100 mt-16 mb-10"/>

        <div className="flex flex-col justify-center items-center rounded-md py-10 text-cinza-100 w-full
            bg-black/70 gap-5">
                <h2 className="text-4xl">Principais categorias:</h2>
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
                        <p className="text-cinza-100 text-3xl">Ods</p>
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
    </>
    )
}

export default RelatorioEmpresa