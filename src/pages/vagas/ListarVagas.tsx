import { useEffect, useState } from "react"
import { api } from "../../service/Service"
import Vaga from "../../model/Vaga"
import padrao from '../../assets/padraoVagas.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDate } from '../../utils/DateFormat'

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
            <div className="flex flex-col justify-center items-center w-full mt-14 p-5">
                <h2 className="text-2xl text-center font-bold mb-4 text-roxo-800">{vaga.titulo}</h2>
                <p className="text-sm text-cinza-900">
                    Por: <span className="font-semibold text-cinza-600">{vaga.Ong?.nome}</span>
                </p>
                <div className="w-full">
                    <span className="text-sm text-white rounded-sm bg-laranja-300 py-1 px-2">
                        {formatDate(vaga.data)}
                    </span>
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