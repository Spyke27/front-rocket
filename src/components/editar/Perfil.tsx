import { ChangeEvent, useContext, useEffect, useState } from "react"
import Empresa from "../../model/Empresa"
import Ong from "../../model/Ong"
import { api } from "../../service/Service"
import { UserContext } from "../../contexts/UserContex"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import axios from "axios"

function EditarPerfil() {
    const [empresa, setEmpresa] = useState<Empresa>()
    const [ong, setOng] = useState<Ong>()
    const userLogged = useContext(UserContext)
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        async function getPerfil(){
            const response = await api.get(`/${userLogged?.tipo == "empresas" ? "empresas" : "ongs"}/info`)
            if(userLogged?.tipo == "empresas"){
                setEmpresa(response.data)
                setCep(response.data.Endereco.cep)
                setBairro(response.data.Endereco.bairro)
                setRua(response.data.Endereco.rua)
                setCidade(response.data.Endereco.cidade)
                setEstado(response.data.Endereco.estado)
            } else {
                setOng(response.data)
            }
        }
        getPerfil()
    }, [userLogged?.tipo])

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        if(empresa){
            setEmpresa({
                ...empresa,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            if(empresa){
                await api.put(`/empresas/id/${empresa.id}`, {
                    ...empresa
                })
            }
            toast.success('Informações atualizadas!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
        } catch (error) {
            toast.warn('Verifique as informações!', {
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

    const onSubmitEndereco = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            endereco_id: empresa?.Endereco?.id,
            cep,
            rua,
            bairro,
            cidade,
            estado
        }

        try {
            await api.put(`/enderecos`, data)

            toast.success('Endereço atualizado!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        } catch (error) {
            toast.warn('Verifique as informações!', {
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

    const completeCep = async () => {
        cep.replace(/\D/g, '')
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            setRua(response.data.logradouro),
            setBairro(response.data.bairro),
            setCidade(response.data.localidade),
            setEstado(response.data.uf)
    }

return (
<>
<div className="w-full md:p-4 bg-cinza-300">
{empresa &&
    <div className="flex gap-4">
    <form onSubmit={onSubmit}
    className="flex w-1/2 flex-col justify-center md:gap-3 bg-white rounded-sm md:p-10">

        <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold">Editar informações</h2>

        <div>
          <label htmlFor="nome" 
            className="block mb-2 text-sm font-medium text-cinza-600">Nome:</label>
            <input type="text" name="nome" id="nome"
            value={empresa.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required/>         
        </div>

        <div>
          <label htmlFor="email" 
            className="block mb-2 text-sm font-medium text-cinza-600">Email:</label>
            <input type="email" name="email" id="email"
            value={empresa.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required/>        
        </div>

        <div className="flex gap-2">
            <div className="w-1/2">
            <label htmlFor="site" 
                className="block mb-2 text-sm font-medium text-cinza-600">Site:</label>
                <input type="text" name="site" id="site"
                value={empresa.site?.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>        
            </div>

            <div className="w-1/2">
            <label htmlFor="instagram" 
                className="block mb-2 text-sm font-medium text-cinza-600">Instagram:</label>
                <input type="text" name="instagram" id="instagram"
                value={empresa.instagram?.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>        
            </div>
        </div>

        <button type="submit" 
            className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3 hover:bg-roxo-400">
                Atualizar dados
        </button>
        <p className="text-sm">Clique 
            <Link to={``} className="text-roxo-300 underline"> AQUI </Link>
            para alterar a senha.
        </p>
    </form>
    {/* ENDEREÇO */}
    <form onSubmit={onSubmitEndereco}
    className="flex w-1/2 flex-col justify-center md:gap-3 bg-white rounded-sm md:p-10">
        <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold">Endereço</h2>

        <div className="flex gap-2">
            <div className="w-1/2">
            <label htmlFor="cep" 
                className="block mb-2 text-sm font-medium text-cinza-600">Cep:</label>
                <input type="text" name="cep" id="cep"
                value={cep}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
                onBlur={completeCep}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>        
            </div>

            <div className="w-1/2">
            <label htmlFor="bairro" 
                className="block mb-2 text-sm font-medium text-cinza-600">Bairro:</label>
                <input type="text" name="bairro" id="bairro"
                value={bairro}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBairro(e.target.value)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>        
            </div>
        </div>

            <div className="w-full">
            <label htmlFor="rua" 
                className="block mb-2 text-sm font-medium text-cinza-600">Rua:</label>
                <input type="text" name="rua" id="rua"
                value={rua}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRua(e.target.value)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>         
            </div>

        <div className="flex gap-2">
            <div className="w-4/5">
            <label htmlFor="cidade" 
                className="block mb-2 text-sm font-medium text-cinza-600">Cidade:</label>
                <input type="text" name="cidade" id="cidade"
                value={cidade}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCidade(e.target.value)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>         
            </div>

            <div className="w-1/5">
            <label htmlFor="estado" 
                className="block mb-2 text-sm font-medium text-cinza-600">UF:</label>
                <input type="text" name="estado" id="estado"
                value={estado}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEstado(e.target.value)}
                className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
                focus:outline-none focus:border-roxo-300" required/>         
            </div>
        </div>

        <button type="submit" 
            className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3 hover:bg-roxo-400">
                Atualizar endereço
        </button>

        <p className="text-sm">Cadastrar 
            <Link to={``} className="text-roxo-300 underline"> novo endereço</Link>.
        </p>
    </form>
    </div>
}

{/* INSTITUIÇÃO */}

{ong &&
    <form 
    className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20">

        <div>
          <label htmlFor="nome" 
            className="block mb-2 text-sm font-medium text-cinza-600">Nome:</label>
            <input type="text" name="nome" id="nome"
            placeholder="Digite o nome/razão"
            value={ong.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required/>         
        </div>

    </form>
}
</div>
</>
)
}

export default EditarPerfil