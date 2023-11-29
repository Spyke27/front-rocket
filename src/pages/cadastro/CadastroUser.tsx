import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import User from "../../model/User";
import { api } from "../../service/Service";
import { toast } from 'react-toastify';

function CadastroUser() {
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [verificaSenha, setVerificaSenha] = useState(false)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState<User>({
        id: 0,
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        telefone: '',
        cadastro: '',
        data_nasc: '',
        empresa_id: 0,
        avatar: ''
    })

    useEffect(() => {
      document.title = 'Cadastro Voluntário';
    }, []);

    useEffect(() => {
      if(confirmarSenha != usuario.senha){
        setVerificaSenha(true)
      } else {
        setVerificaSenha(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmarSenha])

    const confirmarSenhaHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmarSenha(e.target.value)
    }

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        if(confirmarSenha == usuario.senha){
          await api.post('usuarios/cadastrar', {
            ...usuario
          })
        } 
        else {
          toast.warn('As senhas devem ser iguais!', {
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
        navigate('/login')
        toast.success('Usuário cadastrado!', {
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

return(
    <>
    <div className="bg-roxo-300 shadow-inner p-10
    md:m-0 md:p-10 md:px-56">
    <form onSubmit={onSubmit}
    className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20">
      <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold">Cadastro Usuário</h2>

      <div className="md:flex md:gap-5">
          <div className="md:w-1/2 mb-2 md:mb-0">
            <label htmlFor="nome" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Nome:</label>
            <input type="text" name="nome" id="nome" placeholder="Digite seu primeiro nome"
            value={usuario.nome} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="sobrenome" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Sobrenome:</label>
            <input type="text" name="sobrenome" id="sobrenome" placeholder="Digite seu sobrenome"
            value={usuario.sobrenome} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required/>
          </div>
      </div>
      
      <div>
          <label htmlFor="email" 
          className="block mb-2 text-sm font-medium text-cinza-600">*Email:</label>
          <input type="email" name="email" id="email" placeholder="Digite seu email"
          value={usuario.email} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
          focus:outline-none focus:border-roxo-300" required/>
      </div>
      <div>
        <label htmlFor="senha" 
        className="block mb-2 text-sm font-medium text-cinza-600">*Senha:</label>
        <input type="password" name="senha" id="senha" 
        placeholder="**********"
        value={usuario.senha}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        minLength={6}
        className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
      </div>
      <div>
        <label htmlFor="confirmarSenha"
        className="block mb-2 text-sm font-medium text-cinza-600">*Confirmar senha:</label>
        <input type="password" name="confirmarSenha" id="confirmarSenha" 
        placeholder="**********"
        value={confirmarSenha}
        onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
        minLength={6}
        className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
        {verificaSenha? <p className="text-xs text-laranja-500">as senhas devem ser iguais</p> : ''}
      </div>

      <div className="md:flex md:gap-5 md:flex-row flex flex-col gap-2">
        <div className="md:w-1/2">
            <label htmlFor="telefone" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Telefone:</label>
            <input type="tel" name="telefone" id="telefone" placeholder="(00)00000-0000"
            maxLength={11}
            value={usuario.telefone.replace(/\D+/g, '')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300"/>
        </div>
        <div className="md:w-1/2">
            <label htmlFor="data_nasc" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Data de nascimento:</label>
            <input type="date" name="data_nasc" id="data_nasc" placeholder="01/01/2000"
            value={usuario.data_nasc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300"/>
        </div>
      </div>
      <div>
        <label htmlFor="empresa_id"
        className="block mb-2 text-sm font-medium text-cinza-600">*ID empresa:</label>
        <input type="number" name="empresa_id" id="empresa_id" placeholder="Identificador"
        value={usuario.empresa_id}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        className=" text-cinza-600 text-sm w-full md:w-32 p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
      </div>

      <button type="submit" 
      className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3
      hover:bg-roxo-400">
        Cadastrar
      </button>

      <hr className="text-roxo-500 mt-4 md:my-4" />
      <p className="text-center text-cinza-900">Outros cadastros:</p>
      <div className="flex justify-center items-center gap-2">
        <Link to={'/empresas/cadastrar'}>
          <button 
            className="flex justify-center items-center bg-roxo-300 text-cinza-100 px-3 py-2 rounded-sm font-light
            hover:bg-roxo-400">
            Empresas ➜
          </button>
        </Link>
        <Link to={'/instituicoes/cadastrar'}>
          <button 
            className="flex justify-center items-center bg-roxo-300 text-cinza-100 px-3 py-2 rounded-sm font-light hover:bg-roxo-400">
            Instituições ➜
          </button>
        </Link>
      </div>
    </form>
    </div>
    </>
   )
}

export default CadastroUser;