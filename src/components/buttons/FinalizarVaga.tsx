import { useState } from "react"
import FinalizarVagaModal from "../modals/FinalizarVagaModal"

type Props = {
    tempo: number
}

function FinalizarVaga(props: Props){
    const [showModal, setShowModal] = useState(false)

    const handleClick =() => {
        setShowModal(true)
    }

    return(
        <>
        <button
        onClick={handleClick}
            className="flex justify-center items-center bg-azul-200 px-8 py-3 rounded-md w-full md:w-full text-white
            hover:bg-azul-200/80">Finalizar Ação
        </button>
        {showModal && <FinalizarVagaModal tempo={props.tempo}/>}
        </>
    )

}  export default FinalizarVaga