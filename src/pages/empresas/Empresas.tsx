import { Link } from "react-router-dom";
import BannerDesktop from '../../assets/images/EmpresasVisitantes_Desktop.png'
import BannerMobile from '../../assets/images/EmpresasVisitantes_Mobile.png'

import VagasEmpresa from "../../components/vagas/VagasEmpresa";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContex";

function Empresas(){
    const largura = window.screen.width
    const userLogged = useContext(UserContext)

return(
<>
    <Link target="_blank" to={'https://www.cbve.org.br/?page_id=14113'}>
        <div className="flex justify-center items-center w-full h-120 md:h-100">
            {largura < 500 &&
                <img src={BannerMobile} alt="Banner" className="w-full h-full"/>
            }
            {largura > 800 &&
                <img src={BannerDesktop} alt="Banner" className="w-full h-full"/>
            }
        </div>
    </Link>

    {userLogged?.tipo == 'empresas' &&
        <VagasEmpresa />
    }
    
</>
)
}

export default Empresas