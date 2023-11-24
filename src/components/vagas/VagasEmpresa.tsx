import { useEffect, useState } from "react"
import { api } from "../../service/Service"
import Vaga from "../../model/Vaga"
import ImagePadrao from '../../assets/images/padraoVagas.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDate } from '../../utils/DateFormat'
import LocalIcon from '../../assets/icons/local.svg'
import HandIcon from '../../assets/icons/hand.svg'
import { Link } from "react-router-dom";

function VagasEmpresa() {
    const [vagas, setVagas] = useState<Vaga[]>([])
    const widthScreen = window.screen.width
    let qtd_slides = 1
    
    if(widthScreen > 1230){
        qtd_slides = 3
    } else if(widthScreen > 820){
        qtd_slides = 2
    }

    async function getVagas() {
        const response = await api.get('/vagas/empresa/listar')
        setVagas(response.data)
    }
    
    useEffect(() => {
        getVagas();
    },[])

    return(
    <>
    
    <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-verde-300 pt-5 ps-5 md:ms-8 mb-5">Vagas associadas:</h2>

        {vagas.length == 0 &&
            <div className="flex flex-col gap-3 justify-center items-center w-full h-20 md:h-36 mb-5">
                <p className="text-lg md:text-2xl text-cinza-500/75">Não há nada no momento...</p>
                <div className="flex gap-3">
                    <Link to={'/vagas'}>
                        <div className="flex justify-center items-center bg-verde-300 text-white font-bold px-4 py-1 rounded-md md:px-10 md:py-3">
                            Ver Vagas
                        </div>
                    </Link>

                    <Link to={'/vagas/cadastrar'}>
                        <div className="flex justify-center items-center bg-verde-300 text-white font-bold px-4 py-1 rounded-md md:px-10 md:py-3">
                            Criar Vaga
                        </div>
                    </Link>
                </div>
            </div>
        }

    <Swiper
        modules={[Pagination]}
        slidesPerView={qtd_slides}
        pagination
    >
        {vagas.map((vaga) => (
          <SwiperSlide key={vaga.id} 
          className="w-72 h-96 relative p-12"
          >
            <Link to={`/vaga/info/${vaga.id}`}>
                <div
                className="shadow-lg rounded-md border border-cinza-200 bg-white flex justify-center 
                items-center flex-col w-72 h-96 hover:scale-105 transition relative duration-300 ease-in-out cursor-pointer pt-40">
                <img src={vaga.capa ?? ImagePadrao} alt="Capa da Vaga" 
                className="top-0 rounded-t-md absolute w-80 h-40" />

                <div className="flex gap-2 py-1 px-2 bg-white z-10 absolute top-32 right-3 rounded-full">
                    <p className="text-xs text-laranja-300">{vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                    <img src={HandIcon} alt="qtd_volun" />
                </div>

                <div className="flex flex-col justify-center items-center w-full p-5">
                    <h2 className="text-2xl text-center font-bold mb-4 text-roxo-800">{vaga.titulo}</h2>
                    <p className="text-sm text-cinza-900">
                        Por: <span className="font-semibold text-cinza-600">
                            {vaga.empresa_id ? vaga.Empresas![0].nome : vaga.Ong?.nome}</span>
                    </p>

                    <div className="flex justify-between w-full mt-16 gap-2">
                        <div className="w-1/3">
                            <span className="text-xs text-white rounded-lg bg-laranja-300 py-1 px-4">
                                {formatDate(vaga.data)}
                            </span>
                        </div>

                        <div className="flex w-2/3 justify-center items-center">
                            <span className="text-xs text-center font-light text-laranja-300 rounded-sm py-1 px-2">
                                {vaga.cidade}, {vaga.estado}
                            </span>
                            <img src={LocalIcon} alt="Ícone Local" 
                            className="h-5"/>
                        </div>
                    </div>
                </div>
                </div>
            </Link>
             
          </SwiperSlide>
        ))}
        </Swiper>
    </div>
    </>
    )
}

export default VagasEmpresa