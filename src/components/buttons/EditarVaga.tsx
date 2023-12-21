import { useNavigate, useParams } from "react-router-dom"

import EditIcon from '../../assets/icons/edit.svg'

function EditarVaga(){
    const params = useParams()
    const navigate = useNavigate()

    return(
        <>
        <button
            onClick={() => navigate(`/vagas/editar/${params.id}`)}
            className="flex justify-center items-center gap-2 bg-azul-200/90 px-8 py-2 md:py-2.5 rounded-md w-1/2 text-white
            hover:bg-azul-200">
            Editar
            <img src={EditIcon} width={15} />
        </button>
        </>
    )

}  export default EditarVaga