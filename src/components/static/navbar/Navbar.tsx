import { Link, useNavigate } from "react-router-dom";

import logo from "../../../assets/cbve/cbve_logo.png";
import search from "../../../assets/icons/search.svg";
import ProfileIcon from "../../../assets/icons/profile.svg";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContex";

function Navbar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate()
  const userLogged = useContext(UserContext)

  const isLogged = () => {
    const token = sessionStorage.getItem("token");
    return token ? true : false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate('/')
    location.reload();
  };

  const handleMenu = () => {
    setActive(!active)
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
              className="mb-2 text-sm font-medium text-cinza-500"
            ></label>
            <div className="bg-cinza-100 ml-10 rounded-full w-96 flex justify-between items-center py-2 px-3">
              <img src={search} alt="search-icon" className="h-6 mr-3" />
              <input
                type="search"
                id="default-search"
                placeholder="Busque por vagas ou ongs"
                className="bg-transparent placeholder-cinza-400 w-full border-none outline-none text-black"
              />
            </div>
          </form>
        </div>

        {active && (
          <div
            className="bg-roxo-500/50 absolute right-14 lg:right-24 top-2 z-20
                rounded-md"
          >
            <ul
              className="flex flex-col list-none text-cinza-100 justify-center items-center 
                [&>*:hover]:cursor-pointer [&>*:hover]:underline [&>*]:text-sm [&>*]:mx-5"
            >
              <li><Link to={`/empresas/perfil/${userLogged?.id}`}>CONTA</Link></li>
              <hr className="text-black/50 w-20"/>
              <li onClick={handleLogout}>LOGOUT</li>
            </ul>
          </div>
        )}

        {isLogged() && (
          <div
            onClick={handleMenu}
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

      <div
        id="sub-menu"
        className="flex justify-center items-center bg-roxo-300 text-cinza-100 h-6 gap-8 
        [&>*:hover]:scale-105 [&>*:hover]:text-white"
      >
        <Link to={'/vagas'}>Ações</Link>
        <Link to={'/empresas'}>Empresa</Link>
        <Link to={'/'}>Voluntário</Link>
        <Link to={'/'} className="hidden md:flex">Ong</Link>
        <Link to={'/'} className="hidden md:flex">Quem somos</Link>
      </div>
    </>
  );
}

export default Navbar;
