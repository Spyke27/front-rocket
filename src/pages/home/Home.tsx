import Banner from '../../components/home/Banner'
import Impacto from '../../components/home/Impacto'
import { Vagas } from '../../components/vagas/ListarVagas'

function Home() {
  return (
    <>
      <Banner />
      <Vagas />
      <Impacto />
    </>
  )
}

export default Home