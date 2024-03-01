import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { api } from "../../service/Service"
import Ong from "../../model/Ong"

import CameraIcon from '../../assets/icons/camera.svg'
import MapIcon from '../../assets/icons/map.svg'
import EmailIcon from '../../assets/icons/email.svg'
import WebIcon from '../../assets/icons/web.svg'
import { formatDate } from "../../utils/DateFormat"
import { VagasSlider } from "../../components/vagas/VagasSlider"

function InstituicaoPerfil(){
    const [ong, setOng] = useState<Ong>()
    const params = useParams()
    const [sobre, setSobre] = useState(true)
    const [acoes, setAcoes] = useState(false)

    useEffect(() => {
        document.title = 'Perfil';
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
        async function getOng(){
            const response = await api.get(`/ongs/id/${params.id}`)
            setOng(response.data)
        }
        getOng()
    }, [params.id])


    return(
    <>
    <div className="w-full flex flex-col px-3 pb-10">
        <div className="w-full flex justify-between items-center py-5">
            <div className="w-36 h-36 md:w-1/5 md:h-auto rounded-md">
                {ong?.logo && 
                    <img src={ong.logo} className="w-full h-full rounded-md"/>
                }
                {!ong?.logo && 
                    <div className="flex  flex-col justify-center items-center gap-2">
                        <img src={CameraIcon} width={50}/>
                        <figcaption>Sem Foto</figcaption>
                    </div>
                }
            </div>
            <div className="flex flex-col w-1/2 md:w-4/5 md:ml-10 break-word">
                <h1 className="text-2xl font-bold md:text-4xl">{ong?.nome}</h1>
                <p className="text-xs text-cinza-300">Associado desde {formatDate(ong?.cadastro??'')}</p>
                <p className="text-laranja-400 text-sm mt-3">{ong?.Endereco?.cidade} - {ong?.Endereco?.estado}</p>
            </div>
        </div>

        <div className="w-full py-1 flex justify-center items-center gap-7 bg-laranja-400/10 text-cinza-900 
        [&>*:hover]:text-laranja-500">
            <button onClick={clickSobre}>Sobre</button>
            <button onClick={clickAcoes}>Ações</button>
        </div>

        <div className="flex w-full mt-3 px-3">
            {sobre &&
                <p className="text-cinza-900">{ong?.sobre}</p>
            }
            {acoes &&
                <VagasSlider url={`/vagas/listar/ong/${params.id}`}/>
            }
        </div>

        <hr className="border text-cinza-900/70 mx-3 my-10"/>

        <div className="flex flex-col gap-2">
            <h2 className="text-xl text-cinza-900 ml-3 mb-3">Contato:</h2>
            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={EmailIcon} width={15} />
                </div>
                <Link to={`mailto:${ong?.email}`}>
                    <p className="text-sm text-cinza-900">{ong?.email}</p>
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={WebIcon} width={15} />
                </div>
                <Link to={`${ong?.site}`}>
                    <p className="text-sm text-cinza-900">{ong?.site}</p>
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center bg-cinza-100 rounded-full p-1.5">
                    <img src={MapIcon} width={15} />
                </div>
                <p className="text-sm text-cinza-900">{ong?.Endereco?.rua}, {ong?.Endereco?.bairro}. <br />
                {ong?.Endereco?.cidade} - {ong?.Endereco?.estado} <br />
                Cep: {ong?.Endereco?.cep}</p>
            </div>
        </div>

    </div>
    </>
    )
}

export default InstituicaoPerfil