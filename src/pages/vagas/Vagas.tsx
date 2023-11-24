import VagasCausa from "../../components/vagas/VagasCausa"
import { Link } from "react-router-dom";
import PlusIcon from '../../assets/icons/plus.svg'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContex";

function Vagas(){
    const userLogged = useContext(UserContext)
    const [allow, setAllow] = useState(false)
    const [hidden, setHidden] = useState('hidden')

    useEffect(() => {
        if(userLogged?.tipo == 'empresas' || userLogged?.tipo == 'ongs'){
            setAllow(true)
        }
    }, [userLogged?.tipo])

    const handleMouseOver = () => {
        setHidden('flex')
    }
    const handleMouseOut = () => {
        setHidden('hidden')
    }

    return(
        <>
        <div className="flex flex-col relative">
            <VagasCausa />
            
            {allow &&
                <Link to={'/vagas/cadastrar'}>
                    <div
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    className="flex gap-2 justify-center items-center px-3 py-3 rounded-full bg-verde-300
                    hover:scale-105 fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 text-white">
                        <p className={hidden}>Criar Ação</p>
                        <p className="flex md:hidden text-sm">Criar Ação</p>
                        <img src={PlusIcon} width={25}/>
                    </div>
                </Link>
            }
        </div>
        </>
    )
}

export default Vagas