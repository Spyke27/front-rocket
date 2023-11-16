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

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/usuarios/cadastrar' element={<CadastroUser />} />
        <Route path='/empresas/cadastrar' element={<CadastroEmpresa />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
