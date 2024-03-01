import './App.css'
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import CadastroUser from './pages/cadastro/CadastroUser'
import CadastroEmpresa from './pages/cadastro/CadastroEmpresa'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CadastroOng from './pages/cadastro/CadastroOng'
import CadastroVaga from './pages/cadastro/CadastroVaga'
import Empresas from './pages/empresas/Empresas'
import Vagas  from './pages/vagas/Vagas'
import InfoVaga from './components/vagas/InfoVaga'
import EmpresaPerfil from './pages/perfil/Empresa'
import RelatorioEmpresa from './pages/relatorios/RelatorioEmpresa'
import EditarVaga from './pages/editar/EditarVaga'
import RelatorioGeral from './pages/relatorios/RelatorioGeral'
import Voluntario from './pages/voluntarios/Voluntario'
import InstituicaoPerfil from './pages/perfil/Instituicao'
import Instituicao from './pages/instituicoes/Instituicao'
import VoluntarioPerfil from './pages/perfil/Voluntario'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/usuarios/cadastrar' element={<CadastroUser />} />
        <Route path='/empresas/cadastrar' element={<CadastroEmpresa />} />
        <Route path='/instituicoes/cadastrar' element={<CadastroOng />} />

        <Route path='/empresas' element={<Empresas />} />
        <Route path='/empresas/info/:id' element={<EmpresaPerfil />} />

        <Route path='/instituicoes/info/:id' element={<InstituicaoPerfil />} />
        <Route path='/instituicoes' element={<Instituicao />} />

        <Route path='/usuarios/info/:id' element={<VoluntarioPerfil />} />

        <Route path='/vagas/cadastrar' element={<CadastroVaga />} />
        <Route path='/vagas/editar/:id' element={<EditarVaga />} />
        <Route path='/vagas' element={<Vagas />} />
        <Route path='/vaga/info/:id' element={<InfoVaga />} />

        <Route path='/relatorio/:id' element={<RelatorioEmpresa />} />
        <Route path='/geral/relatorio' element={<RelatorioGeral />} />

        <Route path='/voluntarios' element={<Voluntario />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
