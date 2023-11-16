import { useEffect, useState } from "react"
import { api } from "../../service/Service"
import Vaga from "../../model/Vaga"

export const Vagas = () => {
    const [vagas, setVagas] = useState<Vaga[]>([])

    async function getVagas() {
        const response = api.get('/vagas')
        setVagas((await response).data)
    }

    useEffect(() => {
        getVagas();
    },[])

    return(
    <>
        <div className="w-full bg-purple-300 p-10">
            {vagas.map((vaga) => (
                <div key={vaga.id} 
                className="flex flex-col justify-center items-center bg-white w-72 h-96 rounded-md relative hover:scale-105 transition duration-300 ease-in-out p-2">
                    <img src={vaga.capa ?? 'https://i.imgur.com/nOz2NC4.jpg'} alt="Capa da Vaga" 
                    className="w-full absolute top-0 rounded-t-md" />
                    <div className="flex w-full items-center mt-10">
                        <span className="bg-purple-500 w-4 h-8 mr-2"></span>
                        <h2 className="text-xl font-bold mb-4 text-black">{vaga.titulo}</h2>
                    </div>
                    <p className="text-sm text-center">{vaga.sobre}</p>
                </div>
            ))}
        </div>
    </>
    )
}