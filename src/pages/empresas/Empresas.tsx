import { Link } from "react-router-dom";
import BannerDesktop from '../../assets/images/EmpresasVisitantes_Desktop.png'
import BannerMobile from '../../assets/images/EmpresasVisitantes_Mobile.png'
import { VagasSlider } from "../../components/vagas/VagasSlider";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContex";

import CreativeTeam from '../../assets/images/CreativeTeam.svg'
import Solidarity from '../../assets/images/Solidarity.svg'
import ManThinking from '../../assets/images/ManThinking.svg'

function Empresas(){
    const largura = window.screen.width
    const userLogged = useContext(UserContext)

    useEffect(() => {
        document.title = 'Para empresas';
      }, []);

      const handleClick = () => {
        window.scrollTo(0, 0);
      }

return(
<>
    <Link target="_blank" to={'/empresas'}>
        <div className="flex justify-center items-center w-full h-120 md:h-100">
            {largura < 500 &&
                <img src={BannerMobile} alt="Banner" className="w-full h-full"/>
            }
            {largura > 800 &&
                <img src={BannerDesktop} alt="Banner" className="w-full h-full"/>
            }
        </div>
    </Link>

    {userLogged?.tipo == 'empresas' &&
        <VagasSlider url={`/vagas/empresa/vagas/${userLogged.id}`} text={'Vagas associadas:'}/>
    }

    {userLogged?.tipo != 'empresas' &&
        <section className="flex flex-col p-14 items-center gap-10">
            <h2 className="text-roxo-800 font-bold text-center text-4xl">Vantagens do voluntariado empresarial</h2>
            <div className="flex gap-10">
                <div className="flex flex-col justify-center items-center gap-3 w-1/3">
                    <h3 className="text-roxo-800 text-2xl text-center">Mantenha o time unido</h3>
                    <img src={CreativeTeam} width={300}
                    className=""/>
                    <p className="text-lg text-roxo-800 text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center gap-3 w-1/3">
                    <h3 className="text-roxo-800 text-2xl text-center">Inspire a solidariedade</h3>
                    <img src={Solidarity} width={300}
                    className=""/>
                    <p className="text-lg text-roxo-800 text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center gap-3 w-1/3">
                    <h3 className="text-roxo-800 text-2xl text-center">Desperte a criatividade</h3>
                    <img src={ManThinking} width={300}
                    className=""/>
                    <p className="text-lg text-roxo-800 text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>
            <Link to={'/empresas/cadastrar'}>
            <button 
            onClick={handleClick}
                className="bg-verde-300/90 hover:bg-verde-300 font-bold text-xl text-cinza-100 px-6 py-3 w-44 rounded-full">
                associe-se
            </button>
            </Link>

            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/p3NTyA9uV9A?si=4Hk-If9btsO1A4zV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </section>
    }

</>
)
}

export default Empresas