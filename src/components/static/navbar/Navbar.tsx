import { Link, useNavigate } from "react-router-dom";

import logo from "../../../assets/cbve/cbve_logo.png";
import search from "../../../assets/icons/search.svg";
import Logout from "../../../assets/icons/logout.svg";
import ProfileIcon from "../../../assets/icons/profile.svg";
import { ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContex";
import { VagasSlider } from "../../vagas/VagasSlider";
import ArrowLeftIcon from '../../../assets/icons/arrow_left.svg'

function Navbar() {
  const [busca, setBusca] = useState('')
  const [resultado, setResultado] = useState(false)
  const navigate = useNavigate()
  const userLogged = useContext(UserContext)

  const isLogged = () => {
    const token = sessionStorage.getItem("token");
    return token ? true : false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    navigate(0)
  }

  const handleConta = () => {
    const tipo = userLogged?.tipo
    if(tipo == 'empresas'){
      navigate(`/empresas/info/${userLogged?.id}`)
    }
    else if(userLogged?.tipo == 'usuarios'){
      navigate(`/usuarios/info/${userLogged?.id}`)
    }
    else if(userLogged?.tipo == 'ongs'){
      navigate(`/instituicoes/info/${userLogged?.id}`)
    }
  }

  return (
    <>
      <nav className="h-16 md:h-16 flex items-center justify-between px-3 md:px-12">
        <div className="flex items-center w-1/2">
          <Link to={"/"}>
            <div id="logo" className="w-36">
              <img src={logo} alt="logo" />
            </div>
          </Link>

          <form className="hidden md:flex">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-cinza-500" >
            </label>
            <div className="bg-cinza-100 ml-10 rounded-full w-96 flex justify-between items-center py-2 px-3">
              <input
                value={busca}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if(e.key === 'Enter'){
                    e.preventDefault()
                    setResultado(true)
                  }
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
                type="search"
                id="default-search"
                placeholder="Busque por ações ou ongs"
                className="bg-transparent ml-5 placeholder-cinza-400 w-full border-none outline-none text-black"
              />
              <img src={search} alt="search-icon" className="h-6 ml-3 cursor-pointer" onClick={() => setResultado(true)}/>
            </div>
          </form>
        </div>

        {isLogged() && (
          <div
            onClick={handleConta}
            className="flex justify-center items-center h-10 w-10 rounded-full bg-cinza-100
           hover:bg-cinza-200 hover:cursor-pointer"
          >
            <img src={ProfileIcon} alt="Profile" width={25} />
          </div>
        )}

        {!isLogged() && (
          <div className="flex items-center justify-center gap-2">
            <Link to={"/login"}>
              <button className="rounded-md hover:bg-cinza-100  px-4 py-2 text-cinza-600">
                Login
              </button>
            </Link>
            <Link to={"usuarios/cadastrar"}>
              <button className="rounded-md bg-roxo-300 px-4 py-2 text-cinza-100 hover:bg-roxo-400">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div id="sub-menu"
        className="flex relative justify-center items-center bg-roxo-300 text-cinza-100 h-6 gap-8 
        [&>*:hover]:scale-105 [&>*:hover]:text-white">
        <Link to={'/vagas'}>Ações</Link>
        <Link to={'/empresas'}>Empresa</Link>
        <Link to={'/voluntarios'}>Voluntário</Link>
        <Link to={'/instituicoes'} className="hidden md:flex">Instituição</Link>
        <Link to={'/quemsomos'} className="hidden md:flex">Quem somos</Link>
        {isLogged() && 
          <button 
          onClick={handleLogout}
            className="absolute right-10 flex gap-2 items-center">
              Logout
              <img src={Logout} width={15} />
        </button>
        }
      </div>

      {busca.length > 0 &&
        <div className="absolute z-50 bg-white w-full md:py-10">
            {resultado && 
              <section className="flex">
                <button
                    onClick={() => {
                      setResultado(false)
                      setBusca('')
                    }}
                    className="flex justify-center items-center bg-cinza-200 rounded-full p-3 absolute top-3 left-3 z-10">
                        <img src={ArrowLeftIcon} width={20}/>
                </button>
                <VagasSlider url={`/vagas/buscar/${busca}`} text={"Resultado da pesquisa:"}/>
              </section>
            }
        </div>
      }
    </>
  );
}

export default Navbar;
