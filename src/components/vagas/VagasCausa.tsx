import { useEffect, useState } from "react"
import Causa from "../../model/Causa"
import { api } from "../../service/Service"
import { VagasSlider } from "./VagasSlider"

function VagasCausa(){
    const [causas, setCausas] = useState<Causa[]>([]);
    const [causa, setCausa] = useState('1');

    useEffect(() => {
        const getCausas = async () => {
            const response = await api.get('/causas')
            setCausas(response.data)
        }
        getCausas()
    }, [])

    return(
    <>
    <div className="flex flex-col mt-5">
        <div className="ml-8 md:ml-14">
            <label className="block text-sm md:text-lg text-cinza-900">Selecione a causa:</label>
            <select name="causa" id="causa"
            value={causa}
            onChange={(e) => setCausa(e.target.value)}
            className="appearance-none bg-gray-50 border border-verde-300 text-cinza-900 text-sm 
            rounded-md w-32 md:w-48 px-2.5 py-1 focus:border-2">
                {causas.map((causa) => (
                    <option key={causa.id} value={causa.id}>{causa.nome}</option>
                ))}
            </select>
        </div>

        <VagasSlider url={`/vagas/${causa}`}/>
    </div>
    </>
    )
}

export default VagasCausa