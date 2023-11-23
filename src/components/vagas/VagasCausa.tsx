import { useEffect, useState } from "react"
import Vaga from "../../model/Vaga"
import Causa from "../../model/Causa"
import { api } from "../../service/Service"
import ImagePadrao from '../../assets/images/padraoVagas.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { formatDate } from '../../utils/DateFormat'
import LocalIcon from '../../assets/icons/local.svg'
import HandIcon from '../../assets/icons/hand.svg'

function VagasCausa(){
    const [vagas, setVagas] = useState<Vaga[]>([])
    const [causas, setCausas] = useState<Causa[]>([]);
    const [causa, setCausa] = useState('1');
    const widthScreen = window.screen.width
    let qtd_slides = 1
    
    if(widthScreen > 1230){
        qtd_slides = 3
    } else if(widthScreen > 820){
        qtd_slides = 2
    }

    
    useEffect(() => {
        const getVagas = async () => {
            const response = await api.get(`/vagas/${causa}`)
            setVagas(response.data)
        }
        getVagas()
        console.log(vagas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[causa])

    useEffect(() => {
        const getCausas = async () => {
            const response = await api.get('/causas')
            setCausas(response.data)
        }
        getCausas()
    }, [])

    return(
    <>
    <div className="flex flex-col py-5">
        <div className="ml-8 md:ml-14">
            <label className="block mb-2 text-sm text-cinza-900">Selecione a causa:</label>
            <select name="causa" id="causa"
            value={causa}
            onChange={(e) => setCausa(e.target.value)}
            className="appearance-none bg-gray-50 border border-verde-300 text-cinza-900 text-sm 
            rounded-md w-32 md:w-48 px-2.5 py-1 focus:border-2">
                {causas.map((causa) => (
                    <option key={causa.id} value={causa.id}>{causa.nome}</option>
                ))}
            </select>
        </div>

        {vagas.length == 0 &&
            <div className="flex flex-col gap-3 justify-center items-center w-full h-20 md:h-36 mb-5">
                <p className="text-lg md:text-2xl text-cinza-500/75">Não há nada no momento...</p>
            </div>
        }

        <div className="w-full">
            <Swiper
                modules={[Pagination]}
                slidesPerView={qtd_slides}
                pagination
            >
                {vagas.map((vaga) => (
                <SwiperSlide key={vaga.id} 
                className="w-72 h-96 relative p-12"
                >
                    <div className="shadow-lg rounded-md border border-cinza-200 bg-white flex justify-center 
                        items-center flex-col w-72 h-96 hover:scale-105 transition relative duration-300 ease-in-out cursor-pointer">
                        <img src={vaga.capa ?? ImagePadrao} alt="Capa da Vaga" 
                        className="top-0 rounded-t-md absolute w-80" />
                        <div className="flex gap-2 py-1 px-2 bg-white z-10 absolute top-32 right-3 rounded-full">
                            <p className="text-xs text-laranja-300">{vaga.qtd_volun}/{vaga.qtd_vagas}</p>
                            <img src={HandIcon} alt="qtd_volun" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-full mt-36 p-5">
                            <h2 className="text-2xl text-center font-bold mb-4 text-roxo-800">{vaga.titulo}</h2>
                            <p className="text-sm text-cinza-900">
                                Por: <span className="font-semibold text-cinza-600">{vaga.Ong?.nome}{vaga.Empresa?.nome}</span>
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
    </div>
    </>
    )
}

export default VagasCausa