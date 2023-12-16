import { ChangeEvent, useEffect, useState } from "react"
import Vaga from "../../model/Vaga";
import Causa from "../../model/Causa";
import { api } from "../../service/Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RedirectLogin from '../../service/RedirectLogin'
import Ods from "../../model/Ods";

function CadastroVaga() {
    const [causas, setCausas] = useState<Causa[]>([]);
    const [ods, setOds] = useState<Ods[]>([]);
    const [selectCausa, setSelectCausa] = useState('1');
    const [selectOds, setSelectOds] = useState('1');
    const [selectData, setSelectData] = useState('');
    const [text, setText] = useState('');
    const [cep, setCep] = useState('');
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const navigate = useNavigate()
    const [boxValue, setBoxValue] = useState(true);

    const [vaga, setVaga] = useState<Vaga>({
        id: 0,
        titulo: '',
        sobre: '',
        causa_id: 0,
        data: '',
        duracao: 0,
        empresa_id: 0,
        ong_id: 0,
        ods_id: 0,
        impacto: 0,
        politica: '',
        qtd_vagas: 0,
        qtd_volun: 0,
        disponivel: true,
        finalizada: false,
        capa: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
    })

    useEffect(() => {
        document.title = 'Cadastrar Ação';
      }, []);

    useEffect(() => {
        async function getCausas(){
            const response = await api.get('/causas')
            setCausas(response.data)
        }
        getCausas()
    }, [])

    useEffect(() => {
        async function getOds(){
            const response = await api.get('/ods')
            setOds(response.data)
        }
        getOds()
    }, [])

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setVaga({
            ...vaga,
            [e.target.name]: e.target.value.trim(),
            causa_id: parseInt(selectCausa),
            ods_id: parseInt(selectOds),
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
            ods_id: vaga.ods_id,
            impacto: vaga.impacto * 3,
            politica: vaga.politica,
            capa: vaga.capa,
            cep,
            rua: endereco.rua,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
            duracao: parseInt(horas) * 60 + parseInt(minutos),
            disponivel: boxValue
        }

        try {
            await api.post('/vagas/cadastrar', data)
            navigate(-1)
            toast.success('Vaga Cadastrada!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } 
        catch (error) {
            toast.warn('Verifique os dados', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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

    const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        setBoxValue(e.target.checked)
    }

    return(
    <>
    <RedirectLogin />
    <div className="bg-cinza-100 shadow-inner p-5 md:m-0 md:p-10 md:px-56">
        <form 
        onSubmit={onSubmit}
        className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20 shadow">

            <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold mb-5">Cadastrar Ação</h2>

            <div>
                <input type="url" name="capa" id="capa"
                placeholder="URL da imagem de capa"
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className="text-cinza-600 text-sm border w-full p-2.5 outline-none" required/>
            </div>

            <div className="flex gap-3">
                <input 
                    type="checkbox" name="disponivel" id="disponivel" 
                    checked={boxValue}
                    onChange={handleCheckBox}
                />
                <p className="text-cinza-900 text-sm">Deixar vaga disponível</p>
            </div>

            <div className="flex gap-5 md:gap-10">
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
                    <label htmlFor="ods_id" className="block mb-2 text-sm text-cinza-900">
                        ODS:
                    </label>
                    <select id="ods_id"
                    value={selectOds}
                    onChange={(e) => setSelectOds(e.target.value)}
                    className="bg-gray-50 border border-roxo-500 text-cinza-900 text-sm 
                    rounded-md w-40 md:w-72 px-2.5 py-1 focus:border-2">
                        {ods.map((ods) => (
                            <option key={ods.id} value={ods.id}>{ods.id} - {ods.nome}</option>
                        ))}
                    </select>
                </div>
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
                <div className="md:w-1/3 w-2/3">
                    <label htmlFor="data" 
                    className="block mb-2 text-sm text-cinza-600">Data e horário:</label>
                    <input type="datetime-local" name="data" id="data" placeholder="00/00/0000"
                    onChange={(e) => setSelectData(e.target.value)}
                    className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                    focus:outline-none focus:border-roxo-300"/>
                </div>

                <div className="hidden md:block md:w-1/3 w-1/2 md:px-5">
                    <label htmlFor="qtd_vagas"
                    className="block mb-2 text-sm text-cinza-600">Duracao:</label>

                    <div className="flex items-center gap-1">
                        <input type="number"
                        placeholder="00"
                        value={horas}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setHoras(e.target.value)}
                        className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                        focus:outline-none focus:border-roxo-300" required/>
                        :
                        <input type="number"
                        placeholder="00"
                        max={60}
                        value={minutos}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMinutos(e.target.value)}
                        className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                        focus:outline-none focus:border-roxo-300" required/>
                    </div>
                </div>

                <div className="w-1/2 md:w-1/3">
                    <label htmlFor="qtd_vagas" 
                    className="block mb-2 text-sm text-cinza-600">Vagas:</label>
                    <input type="number" name="qtd_vagas" id="qtd_vagas"
                    placeholder="Voluntários"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                    className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                    focus:outline-none focus:border-roxo-300" required/>
                </div>
            </div>

            <div className="flex flex-col mt-2 gap-3">
                <h2 className="text-cinza-900 text-xl mt-3 md:mt-5">Local da Vaga:</h2>
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

            <div className="w-full mt-3">
                <p className="">
                    Ajude-nos a entender e parametrizar melhor está ação respondendo as perguntas abaixo:
                </p>
            <div className="w-full mt-3">
                <div className="">
                    <label htmlFor="impacto" 
                    className="block mb-2 text-sm text-cinza-600">Quantas pessoas serão impactadas diretamente?</label>
                    <input type="number" name="impacto" id="impacto"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                    className="text-cinza-600 text-sm w-20 p-2.5 border border-cinza-300 
                    focus:outline-none focus:border-roxo-300" required/>
                </div>
                <div className="mt-3">
                    <label htmlFor="politica" 
                    className="block mb-2 text-sm text-cinza-600">Essa ação possuí como finalidade alguma política pública?</label>
                    <input type="text" name="politica" id="politica"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                    className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                    focus:outline-none focus:border-roxo-300" required/>
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