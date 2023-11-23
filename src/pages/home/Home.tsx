import Banner from '../../components/home/Banner'
import Impacto from '../../components/home/Impacto'
import { ListarVagas } from '../../components/vagas/ListarVagas'

function Home() {
  return (
    <>
      <Banner />
      <ListarVagas />
      <Impacto />
    </>
  )
}

export default Home