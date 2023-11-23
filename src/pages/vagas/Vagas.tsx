import VagasCausa from "../../components/vagas/VagasCausa"
import { Link } from "react-router-dom";
import PlusIcon from '../../assets/icons/plus.svg'
import { useState } from "react";

function Vagas(){
    const [hidden, setHidden] = useState('hidden')

    const handleMouseOver = () => {
        setHidden('flex')
    }
    const handleMouseOut = () => {
        setHidden('hidden')
    }

    return(
        <>
        <div className="flex flex-col">
            <VagasCausa />
            
            <Link to={'/vagas/cadastrar'}>
                <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className="flex gap-2 justify-center items-center px-3 py-3 rounded-full bg-verde-300
                hover:scale-105 fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 text-white">
                    <p className={hidden}>Adicionar Vaga</p>
                    <img src={PlusIcon} width={20}/>
                </div>
            </Link>
        </div>
        </>
    )
}

export default Vagas