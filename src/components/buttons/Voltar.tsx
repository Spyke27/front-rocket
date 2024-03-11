import { useNavigate } from "react-router-dom"
import ArrowLeftIcon from '../../assets/icons/arrow_left.svg'

function Voltar(){
    const navigate = useNavigate()

    return(
    <>
    <button
        onClick={() => navigate(-1)}
        className="flex justify-center items-center bg-cinza-200 rounded-full p-3 absolute top-5 left-5 z-10">
            <img src={ArrowLeftIcon} width={20}/>
    </button>
    </>
    )
}

export default Voltar