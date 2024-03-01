import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContex'
import BannerVoluntario from '../../assets/images/BannerVoluntarios.png'
import { VagasSlider } from '../../components/vagas/VagasSlider'

import ManThinking from '../../assets/images/ManThinking.svg'

function Voluntario(){
    const largura = window.screen.width
    const userLogged = useContext(UserContext)

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

        {userLogged?.tipo == 'usuarios' && 
            <VagasSlider url={`/vagas/empresa/vagas/${sessionStorage.getItem('empresaIdUser')}`} text={'Ações disponíveis:'}/>
        }

        {userLogged?.tipo != 'usuarios' && 
            <div className='flex justify-center items-center md:mt-10'>
                <div className='flex justify-center gap-5 items-center bg-azul-200/20 rounded-md p-10 md:w-2/3 text-center'>
                    <p className='w-120 text-xl'>Área destinada à colaboradores de empresas parceiras. <br />
                    Serão visíveis somente ações cujo a <b>empresa</b> já esteja previamente <b>assossiada</b>.
                    </p>
                    <img src={ManThinking} alt="Homem pensativo" width={150}/>
                </div>
            </div>
        }

    </section>
    </>
    )
}

export default Voluntario