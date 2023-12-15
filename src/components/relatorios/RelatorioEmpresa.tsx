import { useContext, useEffect, useState } from "react"
import { api } from "../../service/Service"
import { useParams, useNavigate } from "react-router-dom"
import Empresa from "../../model/Empresa"
import Relatorio from "../../model/Relatorio"
import { convertHour } from "../../utils/DateFormat"
import Voltar from "../buttons/Voltar"
import { UserContext } from "../../contexts/UserContex"

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
    <div className="flex flex-col bg-cinza-600 w-full h-screen p-10 relative">
        <Voltar />
        <h1 className="text-5xl text-cinza-100 text-center w-full">{empresa?.nome}</h1>

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
                    <span className="text-cinza-100 text-4xl text-center">{relatorio?.pessoasImpcatadas}</span>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default RelatorioEmpresa