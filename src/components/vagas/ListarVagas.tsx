import { useEffect, useState } from "react"
import { api } from "../../service/Service"
import Vaga from "../../model/Vaga"
import padrao from '../../assets/padraoVagas.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDate } from '../../utils/DateFormat'
import LocalIcon from '../../assets/icons/local.svg'
import HandIcon from '../../assets/icons/hand.svg'

export const Vagas = () => {
    const [vagas, setVagas] = useState<Vaga[]>([])
    const widthScreen = window.screen.width
    let teste = 1
    
    if(widthScreen > 1230){
        teste = 3
    } else if(widthScreen > 820){
        teste = 2
    }

    async function getVagas() {
        const response = api.get('/vagas')
        setVagas((await response).data)
    }
    useEffect(() => {
        getVagas();
    },[])

    return(
    <>
    <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-roxo-500 pt-5 ps-5 md:ms-8">Vagas Abertas:</h2>
    <Swiper
        modules={[Pagination]}
        slidesPerView={teste}
        pagination
    >
        {vagas.map((vaga) => (
          <SwiperSlide key={vaga.id} 
          className="w-72 h-96 relative p-12"
          >
            <div className="shadow-lg rounded-md border border-cinza-200 bg-white flex justify-center 
            items-center flex-col w-72 h-96 hover:scale-105 transition relative duration-300 ease-in-out cursor-pointer">
            <img src={vaga.capa ?? padrao} alt="Capa da Vaga" 
            className="top-0 rounded-t-md absolute w-80" />
            <div className="flex gap-2 py-1 px-2 bg-white z-10 absolute top-32 right-3 rounded-full">
                <p className="text-xs text-laranja-300">{vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                <img src={HandIcon} alt="qtd_volun" />
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-36 p-5">
                <h2 className="text-2xl text-center font-bold mb-4 text-roxo-800">{vaga.titulo}</h2>
                <p className="text-sm text-cinza-900">
                    Por: <span className="font-semibold text-cinza-600">{vaga.Ong?.nome}</span>
                </p>

                <div className="flex justify-between w-full mt-16">
                    <div className="w-1/3">
                        <span className="text-xs text-white rounded-lg bg-laranja-300 py-1 px-4">
                            {formatDate(vaga.data)}
                        </span>
                    </div>

                    <div className="flex w-2/3 justify-center items-center">
                        <span className="text-xs font-bold text-laranja-300 rounded-sm py-1 px-2">
                            {vaga.cidade}, {vaga.estado}
                        </span>
                        <img src={LocalIcon} alt="Ícone Local" 
                        className="h-5"/>
                    </div>
                </div>
            </div>
            </div>
             
          </SwiperSlide>
        ))}
        </Swiper>
    </div>
    </>
    )
}