import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Empresa from "../../model/Empresa"
import { api } from "../../service/Service"

import CameraIcon from '../../assets/icons/camera.svg'
import MapIcon from '../../assets/icons/map.svg'
import EmailIcon from '../../assets/icons/email.svg'
import WebIcon from '../../assets/icons/web.svg'
import { formatDate } from "../../utils/DateFormat"
import { VagasSlider } from "../../components/vagas/VagasSlider"

function EmpresaPerfil(){
    const [empresa, setEmpresa] = useState<Empresa>()
    const params = useParams()
    const [sobre, setSobre] = useState(true)
    const [acoes, setAcoes] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Perfil Empresa';
      }, []);

    const clickSobre = () => {
        setSobre(true)
        setAcoes(false)
    }
    const clickAcoes = () => {
        setSobre(false)
        setAcoes(true)
    }

    useEffect(() => {
        async function getEmpresa(){
            const response = await api.get(`/empresas/id/${params.id}`)
            setEmpresa(response.data)
        }
        getEmpresa()
    }, [params.id])

    const toRelatorio = () => {
        if(empresa?.id == Number(sessionStorage.getItem('userId'))){
            navigate(`/relatorio/${empresa?.id}`)
        }
    }


    return(
    <>
    <div className="w-full flex flex-col px-3 pb-10">
        <div className="w-full flex justify-between items-center py-5">
            <div className="w-36 h-36 md:w-1/5 md:h-auto rounded-md">
                {empresa?.logo && 
                    <img src={empresa.logo} className="w-full h-full rounded-md"/>
                }
                {!empresa?.logo && 
                    <div className="flex  flex-col justify-center items-center gap-2">
                        <img src={CameraIcon} width={50}/>
                        <figcaption>Sem Foto</figcaption>
                    </div>
                }
            </div>
            <div className="flex flex-col w-1/2 md:w-4/5 md:ml-10 break-word">
                <h1 className="text-2xl font-bold md:text-4xl">{empresa?.nome}</h1>
                <p className="text-xs text-cinza-300">Associado desde {formatDate(empresa?.cadastro??'')}</p>
                <p className="text-laranja-400 text-sm mt-3">{empresa?.Endereco?.cidade} - {empresa?.Endereco?.estado}</p>
                {empresa?.id == Number(sessionStorage.getItem('userId')) && 
                    <button 
                        onClick={toRelatorio}
                        className="bg-roxo-300 w-44 px-4 py-1 text-cinza-100 rounded-lg mt-5 hover:bg-roxo-300/80">
                            Gerar Relatório
                    </button>
                }
            </div>
        </div>

        <div className="w-full py-1 flex justify-center items-center gap-7 bg-laranja-400/10 text-cinza-900 
        [&>*:hover]:text-laranja-500">
            <button onClick={clickSobre}>Sobre</button>
            <button onClick={clickAcoes}>Ações</button>
        </div>

        <div className="flex w-full mt-3 px-3">
            {sobre &&
                <p className="text-cinza-900">{empresa?.sobre}</p>
            }
            {acoes &&
                <VagasSlider url={`/vagas/empresa/vagas/${params.id}`}/>
            }
        </div>

        <hr className="border text-cinza-900/70 mx-3 my-10"/>

        <div className="flex flex-col gap-2">
            <h2 className="text-xl text-cinza-900 ml-3 mb-3">Contato:</h2>
            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={EmailIcon} width={15} />
                </div>
                <Link to={`mailto:${empresa?.email}`}>
                    <p className="text-sm text-cinza-900">{empresa?.email}</p>
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={WebIcon} width={15} />
                </div>
                <Link to={`${empresa?.site}`}>
                    <p className="text-sm text-cinza-900">{empresa?.site}</p>
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={MapIcon} width={15} />
                </div>
                <p className="text-sm text-cinza-900">{empresa?.Endereco?.rua}, {empresa?.Endereco?.bairro}. <br />
                {empresa?.Endereco?.cidade} - {empresa?.Endereco?.estado} <br />
                Cep: {empresa?.Endereco?.cep}</p>
            </div>
        </div>

    </div>
    </>
    )
}

export default EmpresaPerfil