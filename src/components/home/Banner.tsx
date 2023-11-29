import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Sliders from "./Sliders";

const sliders = [
  {
    id: 1,
    title: "Encontre um trabalho voluntário.",
    describe: "Busque formas de se engajar e contribuir com a sociedade",
    image: "bg-[url('https://i.imgur.com/NR8pTTK.jpg')] p-8 md:px-32 bg-center bg-cover bg-cinza-500 bg-blend-multiply h-100",
    textButton: 'INSCREVA-SE ➜'
  },
  {
    id: 2,
    title: "Empreenda com responsabilidade social.",
    describe: "Traga seus colaboradores para nossa rede de Voluntariado!",
    image: "bg-[url('https://i.imgur.com/qn4nQdW.jpg')] p-8 md:px-16 bg-center bg-cover bg-cinza-500 bg-blend-multiply h-100 flex justify-center",
    textButton: 'SAIBA MAIS >>>'
  }
];

function Banner() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000}}
      >
        {sliders.map((item) => (
          <SwiperSlide key={item.id}>
            <Sliders title={item.title} describe={item.describe} image={item.image} textButton={item.textButton}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-2 bg-roxo-500"></div>
    </>
  );
}

export default Banner;