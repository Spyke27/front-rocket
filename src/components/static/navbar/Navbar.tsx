import { Link } from "react-router-dom";

import logo from "../../../assets/cbve_logo.png";
import search from "../../../assets/search.svg";

function Navbar() {

  return (
    <>
      <nav className="h-16 md:h-16 flex items-center justify-between px-3 md:px-12">
        <div className="flex items-center w-1/2">
          <div id="logo" className="w-36">
            <img src={logo} alt="logo" />
          </div>

          <form action="/" className="hidden md:flex">
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

        <div className="flex items-center justify-center gap-2">
          <Link to={'/login'}>
            <button 
            className="rounded-md hover:bg-cinza-100  px-4 py-2 text-cinza-600">
              Login
          </button>
          </Link>
          <Link to={'usuarios/cadastrar'}>          
            <button 
              className="rounded-md bg-roxo-300 px-4 py-2 text-cinza-100 hover:bg-roxo-400">
                Sign up
            </button>
          </Link>
        </div>
          
      </nav>

      <div
        id="sub-menu"
        className="hidden md:flex justify-center items-center bg-roxo-300 text-cinza-100 h-6 gap-8 
        [&>*:hover]:scale-105 [&>*:hover]:text-white">
        <a href="">Empresa</a>
        <a href="">Voluntário</a>
        <a href="">Ong</a>
        <a href="">Quem somos</a>
      </div>
    </>
  );
}

export default Navbar;
