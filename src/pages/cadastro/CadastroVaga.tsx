import { ChangeEvent, useEffect, useState } from "react"
import Vaga from "../../model/Vaga";
import Causa from "../../model/Causa";
import { api } from "../../service/Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CadastroVaga() {
    const [causas, setCausas] = useState<Causa[]>([]);
    const [selectCausa, setSelectCausa] = useState('1');
    const [selectData, setSelectData] = useState('');
    const [text, setText] = useState('');
    const [cep, setCep] = useState('');
    const navigate = useNavigate()
    const [vaga, setVaga] = useState<Vaga>({
        id: 0,
        titulo: '',
        sobre: '',
        causa_id: 0,
        data: '',
        empresa_id: 0,
        ong_id: 0,
        qtd_vagas: 0,
        qtd_volun: 0,
        capa: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
    })

    async function getCausas() {
        const response = api.get('/causas')
        setCausas((await response).data)
    }
    useEffect(() => {
        getCausas()
    }, [])

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setVaga({
            ...vaga,
            [e.target.name]: e.target.value.trim(),
            causa_id: parseInt(selectCausa),
            data: selectData,
            sobre: text
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = {
            titulo: vaga.titulo,
            sobre: vaga.sobre,
            data: vaga.data,
            qtd_vagas: vaga.qtd_vagas,
            causa_id: vaga.causa_id,
            capa: vaga.capa,
            cep,
            rua: endereco.rua,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
        }

        try {
            await api.post('/vagas/cadastrar', data)
            navigate('/')
            toast.success('Vaga Cadastrada!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
        } 
        catch (error) {
            alert(error)
        }
    }

    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
    })

    const completeCep = async () => {
        cep.replace(/\D/g, '')
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setEndereco({
            rua: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
        })
    }

    return(
    <>
    <div className="bg-cinza-100 shadow-inner p-10 md:m-0 md:p-10 md:px-56">
        <form 
        onSubmit={onSubmit}
        className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20 shadow">

            <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold mb-5">Cadastrar Vaga</h2>

            <div>
                <input type="url" name="capa" id="capa"
                placeholder="URL da imagem de capa"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className="text-cinza-600 text-sm border w-full p-2.5 outline-none" required/>
            </div>

            <div>
                <label htmlFor="causas" className="block mb-2 text-sm text-cinza-900">
                    Selecione a causa:
                </label>
                <select id="causas" 
                value={selectCausa}
                onChange={(e) => setSelectCausa(e.target.value)}
                className="bg-gray-50 border border-roxo-500 text-cinza-900 text-sm 
                rounded-md w-32 md:w-48 px-2.5 py-1 focus:border-2">
                    {causas.map((causa) => (
                        <option key={causa.id} value={causa.id}>{causa.nome}</option>
                    ))}
                </select>
            </div>

            <div>
                <input type="text" name="titulo" id="titulo"
                placeholder="Título da vaga"
                maxLength={50}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className="text-cinza-600 text-lg font-bold w-full p-2.5 outline-none placeholder:text-lg" required/>
            </div>

            <div>
                <textarea name="sobre" id="sobre"
                placeholder="Descrição da vaga"
                maxLength={500}
                value={text}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                className="text-cinza-600 text-sm w-full h-20 p-2.5 outline-none border" required/>
            </div>

            <div className="flex gap-2 md:gap-5">
            <div className="w-1/2">
                <label htmlFor="data" 
                className="block mb-2 text-sm text-cinza-600">Data e horário:</label>
                <input type="datetime-local" name="data" id="data" placeholder="00/00/0000"
                onChange={(e) => setSelectData(e.target.value)}
                className="text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300"/>
            </div>

            <div className="w-1/2">
                <label htmlFor="qtd_vagas" 
                className="block mb-2 text-sm text-cinza-600">Vagas:</label>
                <input type="number" name="qtd_vagas" id="qtd_vagas"
                placeholder="Voluntários"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className="text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>
            </div>
            </div>

            <div className="flex flex-col mt-2 gap-3">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="md:w-2/5 w-full">
                        <label className="block mb-2 text-sm text-cinza-600">CEP:</label>
                        <input type="text" name="cep" id="cep"
                            placeholder="00000-000"
                            value={cep}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
                            onBlur={completeCep}
                            className="text-cinza-600 border p-2 outline-none placeholder:font-light
                            placeholder:text-sm w-full"
                        required/>
                    </div>
                    <div className="md:w-2/5">
                        <label htmlFor="cidade" 
                        className="block mb-2 text-sm text-cinza-600">Cidade:</label>
                        <input type="text" name="cidade" id="cidade"
                            placeholder="Localidade"
                            maxLength={50}
                            value={endereco.cidade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            className="text-cinza-600 w-full p-2 outline-none 
                            placeholder:font-light
                            border"
                        required/>
                    </div>
                    <div className="md:w-1/5">
                        <label className="block mb-2 text-sm text-cinza-600">UF:</label>
                        <input type="text" name="cep" id="cep"
                            placeholder="--"
                            value={endereco.estado}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            maxLength={2}
                            className="text-cinza-600 border p-2 outline-none placeholder:font-light
                            placeholder:text-sm w-full"
                        required/>
                    </div>
                </div>

                <div className="md:flex w-full gap-2">
                <div className="md:w-1/2">
                        <label htmlFor="rua" 
                        className="block mb-2 text-sm text-cinza-600">Rua:</label>
                        <input type="text" name="rua" id="rua"
                            placeholder="Logradouro"
                            value={endereco.rua}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            className="text-cinza-600 w-full p-2 outline-none 
                            placeholder:font-light
                            border"
                        required/>
                    </div>

                    <div className="md:w-1/2">
                        <label htmlFor="bairro" 
                        className="block mb-2 text-sm text-cinza-600">Bairro:</label>
                        <input type="text" name="cidade" id="cidade"
                            placeholder="Selecione o bairro"
                            value={endereco.bairro}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            className="text-cinza-600 w-full p-2 outline-none 
                            placeholder:font-light
                            border"
                        required/>
                    </div>
                </div>

            </div>

            <button 
                type="submit" 
                className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3 hover:bg-roxo-400">
                Cadastrar
            </button>

        </form>
    </div>
    </>)
}

export default CadastroVaga