import { ChangeEvent, useState } from 'react'
import SerchIcon from '../../assets/icons/search.svg'
import { VagasSlider } from './VagasSlider'

export const VagasBuscaLocal = () => {
    const [busca, setBusca] = useState('')    

return (
<>
<div className="flex flex-col bg-roxo-500 py-5">
    <div className="bg-cinza-100 ml-10 w-96 flex items-center pl-5">
        <input
            value={busca}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
            type="search"
            id="default-search"
            placeholder="Pesquise por bairro, cidade, estado..."
            className="bg-transparent placeholder-cinza-400 w-full border-none outline-none text-black"/>
        <button className='p-3'>
            <img src={SerchIcon} width={30} />
        </button>
    </div>

    {busca &&
        <VagasSlider url={`/vagas/buscar/local/${busca}`} text={'Resultado:'}/>
    }
</div>
</>
)
}