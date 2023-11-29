import { useEffect } from 'react';
import Banner from '../../components/home/Banner'
import Impacto from '../../components/home/Impacto'
import { VagasSlider } from '../../components/vagas/VagasSlider'
import { Link } from 'react-router-dom'

function Home() {
  useEffect(() => {
    document.title = 'Voluntariado | CBVE';
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Banner />
      <VagasSlider url={'/vagas'} text={'Ações abertas:'}/>
      <Link to={'/vagas'} className='w-full flex justify-center md:justify-start md:pl-10 mt-3'>
        <button
        onClick={handleClick}
        className='px-10 py-3 md:px-14 bg-roxo-300/30 text-roxo-500 rounded-full font-bold
        hover:bg-roxo-300 hover:text-cinza-100'>
          Ver mais
        </button>
      </Link>
      <Impacto />
    </>
  )
}

export default Home