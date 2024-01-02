import { useContext, useEffect, useState } from "react"
import { api } from "../../service/Service"
import { useParams, useNavigate } from "react-router-dom"
import Empresa from "../../model/Empresa"
import Relatorio from "../../model/Relatorio"
import { convertHour } from "../../utils/DateFormat"
import Voltar from "../buttons/Voltar"
import { UserContext } from "../../contexts/UserContex"

import fileIcon from '../../assets/icons/downloadFiler.svg'

function RelatorioEmpresa(){
    const [relatorio, setRelatorio] = useState<Relatorio>()
    const [empresa, setEmpresa] = useState<Empresa>()
    const userLogged = useContext(UserContext)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getCausas = async () => {
            if(params.id == userLogged?.id){
                const response = await api.get(`/relatorio`)
                setRelatorio(response.data)
            } else{
                navigate(-1)
            }
        }
        getCausas()
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
            Relatório de {relatorio?.qtdVagas} ações associadas
        </p>

        <div className="flex w-full mt-10 gap-5">
            <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                <p className="text-cinza-100 text-2xl">Voluntários</p>
                <div className="flex justify-center items-center rounded-full p-14 border-2 border-cinza-100">
                    <span className="text-cinza-100 text-4xl text-center">{relatorio?.usuariosCadastrados}</span>
                </div>
            </div>

            <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                <p className="text-cinza-100 text-2xl">Tempo de Ação</p>
                <div className="flex justify-center items-center rounded-full p-14 border-2 border-cinza-100">
                <span className="text-cinza-100 text-4xl text-center">{
                    relatorio?.tempoVoluntariado? convertHour(relatorio.tempoVoluntariado) : "00:00"
                }</span>
                </div>
            </div>

            <div className="flex flex-col w-1/3 justify-center items-center gap-3">
                <p className="text-cinza-100 text-2xl">Pessoas Impactadas</p>
                <div className="flex justify-center items-center rounded-full p-14 border-2 border-cinza-100">
                    <span className="text-cinza-100 text-4xl text-center">{relatorio?.pessoasImpactadas}</span>
                </div>
            </div>
        </div>
        <hr className="border w-full text-cinza-100 mt-16 mb-10"/>
        <h2 className="text-cinza-100 text-3xl mb-5">Principais categorias defendidas</h2>
        <div className="flex flex-col justify-center items-start gap-2 p-5 border border-cinza-100">
            {relatorio?.causa &&
                <div className="flex items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Causa:</p>
                    <div className="flex justify-center items-center py-1 px-10 border-2 border-cinza-100">
                        <span className="text-cinza-100 text-2xl text-center">{relatorio?.causa}</span>
                    </div>
                </div>
            }
            {relatorio?.ods &&
                <div className="flex items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Ods:</p>
                    <div className="flex justify-center items-center py-1 px-10 border-2 border-cinza-100">
                        <span className="text-cinza-100 text-2xl text-center">{relatorio?.ods}</span>
                    </div>
                </div>
            }
            {relatorio?.politica &&
                <div className="flex items-center gap-3">
                    <p className="text-cinza-100 text-2xl">Política Pública:</p>
                    <div className="flex justify-center items-center py-1 px-10 border-2 border-cinza-100">
                        <span className="text-cinza-100 text-2xl text-center">{relatorio?.politica}</span>
                    </div>
                </div>
            }
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