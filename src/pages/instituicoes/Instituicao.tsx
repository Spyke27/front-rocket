import BannerInstituicao from '../../assets/images/BannerInstituicao_Desktop.png'
import { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContex'
import { VagasSlider } from '../../components/vagas/VagasSlider'

import Volunteering from '../../assets/images/Volunteering.svg'
import Pracinha from '../../assets/images/Pracinha.svg'

function Instituicao(){
    const largura = window.screen.width
    const userLogged = useContext(UserContext)

    return(
    <>
    <section className="w-full flex flex-col pb-10">
        <div onClick={() => scroll(0, 500)}
            className="flex justify-center items-center w-full h-120 md:h-100">
            {largura < 500 &&
                <img src={BannerInstituicao} alt="Banner" className="w-full h-full"/>
            }
            {largura > 800 &&
                <img src={BannerInstituicao} alt="Banner" className="w-full h-full"/>
            }
        </div>


        {userLogged?.tipo == 'ongs' && 
        <div>
            <VagasSlider url={`/vagas/listar/ong/${userLogged.id}`} text={'Ações publicadas:'}/>

            <div className='flex justify-center items-center'>
                <Link to={'/vagas/cadastrar'}>
                    <button className='flex justify-center items-center px-10 py-5 bg-laranja-100/20 text-laranja-500 rounded-full text-lg font-bold hover:scale-105'>
                        Cadastrar Ação
                    </button>
                </Link>
            </div>
        </div>
        }

        {userLogged?.tipo != 'ongs' && 
        <div className="flex flex-col gap-5 p-10 items-center ">
            <h2 className='text-laranja-500 text-5xl'>Soluções para suas ações</h2>
            <div className='flex items-center gap-10 px-10 py-5 bg-laranja-100/40'>
                <p className='text-xl text-cinza-600'>
                <b>It is a long established</b> fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', <b>making it look like</b> <b>readable English</b>. Many desktop publishing <b>packages</b> and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, <b>sometimes by accident</b>, sometimes on purpose.
                </p>
                <img src={Volunteering} alt="Pessoas cuidando da praça" width={400}/>
            </div>  

            <div className='flex items-center gap-10 px-10 py-5 bg-laranja-100/40'>
                <img src={Pracinha} alt="Pessoas cuidando da praça" width={400}/>
                <p className='text-xl text-cinza-600'>
                <b>Contrary to popular belief</b>, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,<b>making it over 2000 years old</b>. Richard McClintock, a <b>Latin professor at Hampden-Sydney College in Virginia</b>, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. <b>Lorem Ipsum</b> comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the <b>Renaissance</b>. The first line of Lorem Ipsum
                </p>
            </div>
            <Link to={'/instituicoes/cadastrar'}>
                <button className='flex justify-center items-center px-10 py-5 bg-laranja-100/20 text-laranja-500 rounded-md text-lg font-bold border-4 border-laranja-500/50 hover:scale-105'>
                    Cadastre-se
                </button>
            </Link>       
        </div>
        }
        
    </section>
    </>
    )
}

export default Instituicao