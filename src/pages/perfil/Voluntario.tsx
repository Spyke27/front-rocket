import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../service/Service"
import User from "../../model/User"

import ProfileImage from "../../assets/icons/profile.svg"
import { formatDate } from "../../utils/DateFormat"

function VoluntarioPerfil(){
    const [voluntario, setVoluntario] = useState<User>()
    const params = useParams()

    useEffect(() => {
        document.title = 'Perfil';
      }, []);

    useEffect(() => {
        async function getVoluntario(){
            const response = await api.get(`/usuarios/perfil`)
            setVoluntario(response.data)
        }
        getVoluntario()
    }, [params.id])


    return(
    <>
    <div className="w-full flex flex-col px-3 pb-10">
        <div className="flex justify-between items-center py-5">

        <div className="flex justify-center items-center h-40 w-40 rounded-full bg-cinza-100">
            <img src={ProfileImage} alt="Profile" width={100} />
          </div>

            <div className="flex flex-col w-1/2 md:w-4/5 md:ml-10 break-word">
                <h1 className="text-2xl font-bold md:text-4xl">{voluntario?.nome}</h1>
                <p className="text-xs text-cinza-300">Associado desde {formatDate(voluntario?.cadastro??"")}</p>
                <p className="text-laranja-400 text-sm mt-3">
                    {voluntario?.Endereco?.cidade} - 
                    {voluntario?.Endereco?.estado}
                </p>
            </div>
        </div>

        <hr className="border text-cinza-900/70 mx-3 my-10"/>
    </div>
    </>
    )
}

export default VoluntarioPerfil