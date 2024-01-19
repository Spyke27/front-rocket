import BannerVoluntario from '../../assets/images/BannerVoluntarios.png'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContex"
import { VagasSlider } from '../../components/vagas/VagasSlider'
import { api } from '../../service/Service'
import Empresa from '../../model/Empresa'

import SendIcon from '../../assets/icons/plane.svg'
import { Link } from 'react-router-dom'

function Voluntario(){
    const largura = window.screen.width
    const userLogged = useContext(UserContext)
    const [empresa, setEmpresa] = useState<Empresa>()

    useEffect(() => {
        async function getEmpresa(){
            const response = await api.get(`/empresas/id/${sessionStorage.getItem('empresaIdUser')}`)
            setEmpresa(response.data)
        }
        getEmpresa()
    }, [])

    return(
    <>
    <section className="w-full flex flex-col pb-10">
        <div onClick={() => scroll(0, 500)}
            className="flex justify-center items-center w-full h-120 md:h-100">
            {largura < 500 &&
                <img src={BannerVoluntario} alt="Banner" className="w-full h-full"/>
            }
            {largura > 800 &&
                <img src={BannerVoluntario} alt="Banner" className="w-full h-full"/>
            }
        </div>

        {userLogged?.tipo == "usuarios" &&
            <div className='flex flex-col'>
                <div className='flex flex-col items-center bg-azul-200/10'>
                    <div className='flex flex-col p-5 bg-black/20 rounded-md mt-10'>
                        <p><span className='text-laranja-400 font-bold'>Aviso! </span>
                        Abaixo você encontrará somente as ações que sua empresa se associou.</p>
                    </div>
                    <VagasSlider 
                        url={`/vagas/empresa/vagas/${sessionStorage.getItem('empresaIdUser')}`}
                        text={'Ações disponíveis:'} />
                </div>

                <div className='w-full px-20 mt-10'>
                    <div className='flex flex-col items-center justify-center py-5 rounded-lg bg-black/20 text-cinza-900'>
                        <h2 className='font-bold text-xl'>Gostou de alguma ação e ela não está disponível?</h2>
                        <p>Entre em contato com o responsável pelo voluntariado em sua empresa e solicite a associação</p>

                        <Link to={`mailto:${empresa?.email}`}>
                            <button 
                                className='flex gap-2 justify-center items-center bg-verde-300 md:px-5 md:py-2 rounded-md hover:bg-verde-300/80 text-cinza-100 mt-3'>
                                    Solicitar para empresa
                                <img src={SendIcon} width={18} />
                            </button>
                        </Link>

                        <div className='flex mt-10'>
                            <p>Caso prefira, entre em contato conosco e iremos lhe auxiliar!</p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </section>
    </>
    )
}

export default Voluntario