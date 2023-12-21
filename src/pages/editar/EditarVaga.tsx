import { ChangeEvent, useContext, useEffect, useState } from "react"
import Vaga from "../../model/Vaga";
import { api } from "../../service/Service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContex";

function EditarVaga() {
    const params = useParams()
    const [text, setText] = useState('');
    const navigate = useNavigate()
    const [boxValue, setBoxValue] = useState(true);
    const [vaga, setVaga] = useState<Vaga>()
    const userLogged = useContext(UserContext)

    useEffect(() => {
        const getVaga = async () => {
            const response = await api.get(`/vagas/info/${params.id}`)
            setVaga(response.data)
            setText(response.data.sobre)
        }
        getVaga()
    }, [params.id])

    useEffect(() => {
        document.title = 'Editar Ação';
      }, []);

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(vaga){
            setVaga({
                ...vaga,
                [e.target.name]: e.target.value.trim(),
                sobre: text
            })
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = {
            id: params.id,
            titulo: vaga?.titulo,
            sobre: vaga?.sobre,
            qtd_vagas: vaga?.qtd_vagas,
            disponivel: boxValue
        }

        try {
            if(vaga?.ong_id == userLogged?.id || vaga?.empresa_id == userLogged?.id){
                await api.put(`/vagas/editar/${vaga?.id}`, data)
            }

            navigate(`/vaga/info/${params.id}`)
            toast.success('Ação editada!', {
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
    const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        setBoxValue(e.target.checked)
    }

    return(
    <>
    <div className="bg-cinza-100 shadow-inner p-5 md:m-0 md:p-10 md:px-56">
        <form 
        onSubmit={onSubmit}
        className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20 shadow">

            <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold mb-5">Editar Ação</h2>

            <img src={String(vaga?.capa)} className="w-full" />
            <div>
                <input type="url" name="capa" id="capa"
                placeholder="URL da imagem de capa"
                value={vaga?.capa??""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className="text-cinza-600 text-sm border w-full p-2.5 outline-none" required/>
            </div>

            <div className="flex justify-center items-center gap-20 w-full">
                <div className="flex gap-3 w-1/2">
                    <input 
                        type="checkbox" name="disponivel" id="disponivel"
                        checked={boxValue}
                        onChange={handleCheckBox}
                    />
                    <p className="text-cinza-900 text-sm">Deixar vaga disponível</p>
                </div>

                <div className="flex gap-2 md:gap-5 w-1/2">
                    <div className="w-1/2">
                        <label htmlFor="qtd_vagas" 
                        className="block mb-2 text-sm text-cinza-600">Vagas:</label>
                        <input type="number" name="qtd_vagas" id="qtd_vagas"
                        value={vaga?.qtd_vagas}
                        placeholder="Voluntários"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                        className="text-cinza-600 text-sm w-full p-2.5 border border-cinza-300 
                        focus:outline-none focus:border-roxo-300" required/>
                    </div>
            </div>
            </div>

            <div>
                <input type="text" name="titulo" id="titulo"
                placeholder="Título da vaga"
                maxLength={50}
                value={vaga?.titulo}
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

            <button 
                type="submit" 
                className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3 hover:bg-roxo-400">
                Salvar alterações
            </button>

        </form>
    </div>
    </>)
}

export default EditarVaga