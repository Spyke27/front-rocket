import { useContext, useEffect, useState } from "react"
import { api } from "../../service/Service"
import Vaga from "../../model/Vaga"
import ImagePadrao from '../../assets/images/padraoVagas.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDate } from '../../utils/DateFormat'
import LocalIcon from '../../assets/icons/local.svg'
import HandIcon from '../../assets/icons/hand.svg'
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";
import Empresa from "../../model/Empresa";

export const VagasLocal = () => {
    const [vagas, setVagas] = useState<Vaga[]>([])
    const [empresa, setEmpresa] = useState<Empresa>()
    const widthScreen = window.screen.width
    const qtd_slides = widthScreen / 340
    const userLogged = useContext(UserContext)
    
    useEffect(() => {
        if(userLogged){
            const getEmpresa = async () => {
                const response = await api.get(`/empresas/id/${userLogged?.id}`)
                setEmpresa(response.data)
            }
            getEmpresa();
    }
    },[userLogged])

    useEffect(() => {
        const getVagas = async () => {
            const response = await api.get(`/local/vagas/${empresa?.Endereco?.bairro}/${empresa?.Endereco?.estado}`)
            setVagas(response.data)
        }
        getVagas();
    }, [empresa])

    return(
    <>    
        {vagas.length == 0 &&
            <div className="flex flex-col bg-roxo-500 gap-3 justify-center w-full h-20 md:h-full pb-20 pt-5">
                <h2 className="text-3xl md:text-4xl font-bold text-cinza-100 md:mb-5 ps-5 md:ms-8">Ações na sua Região:</h2>
                <p className="text-lg md:text-2xl text-cinza-100 text-center">Não há nada no momento...</p>
            </div>
        }
    {vagas.length > 0 &&
    <div className="w-full bg-roxo-500 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cinza-100 md:mb-5 ps-5 md:ms-8">Ações na sua Região:</h2>
        <Swiper
            modules={[Pagination]}
            slidesPerView={qtd_slides}
            pagination
        >
        {vagas.map((vaga) => (
          <SwiperSlide key={vaga.id} 
          className="w-72 h-96 relative px-12 pb-10 mt-5"
          >
        <Link to={`/vaga/info/${vaga.id}`}>
            <div className="shadow-lg rounded-md border border-cinza-200 bg-white flex justify-center 
            items-center flex-col w-72 h-96 hover:scale-105 transition relative duration-300 ease-in-out cursor-pointer pt-40">

            <img src={vaga.capa ?? ImagePadrao} alt="Imagem de capa"
            className="top-0 rounded-t-md absolute w-80 h-40" />

            <div className="flex gap-2 py-1 px-2 bg-white z-10 absolute top-32 right-3 rounded-full">
                <p className="text-xs text-laranja-300">{vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                <img src={HandIcon} alt="qtd_volun" />
            </div>

            <div className="flex flex-col justify-center items-center w-full p-5">
                <h2 className="text-2xl text-center font-bold mb-4 text-roxo-800">{vaga.titulo}</h2>
                <p className="text-sm text-cinza-900">
                    Por: <span className="font-semibold text-cinza-600">
                        {vaga.empresa_id ? vaga.Empresas![0].nome : vaga.Ong?.nome}
                        </span>
                </p>

                <div className="flex justify-between w-full mt-16 gap-2">
                    <div className="w-1/3">
                        <span className="text-xs font-light text-white rounded-lg bg-laranja-300 py-1 px-4">
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
    }
    </>
    )
}