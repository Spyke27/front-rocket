import { useNavigate } from "react-router-dom";
import { api } from "../../service/Service";
import { useEffect, useState } from "react";
import Token from "../../model/Token";
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate()
  const [token, setToken] = useState<Token>()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('usuarios')

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleClick = () => { navigate('/recuperar-senha') }
  const cadastrar = () => { navigate('/usuarios/cadastrar') }
  const refreshPage = () => { location.reload() }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setToken(await api.post(`/${tipo}/login`, { email, senha } ))

      if(token){
        sessionStorage.setItem('token', JSON.stringify(token.data))

          toast.success('Login efetuado!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          navigate(-1)
          setTimeout(refreshPage, 1800)

          if(tipo == 'empresas'){
            const empresa = await api.get(`/empresas/buscar/${email}`)
            sessionStorage.setItem('userType', tipo)
            sessionStorage.setItem('userId', empresa.data.id)
            sessionStorage.setItem('userName', empresa.data.nome)
          } 
          else if(tipo == 'usuarios'){
            const usuario = await api.get(`/usuarios/email/${email}`)
            sessionStorage.setItem('userType', tipo)
            sessionStorage.setItem('userId', usuario.data.id)
            sessionStorage.setItem('userName', usuario.data.nome)
            sessionStorage.setItem('empresaIdUser', usuario.data.empresa_id)
          }
          else if(tipo == 'ongs'){
            const ong = await api.get(`/ongs/email/${email}`)
            sessionStorage.setItem('userType', tipo)
            sessionStorage.setItem('userId', ong.data.id)
            sessionStorage.setItem('userName', ong.data.nome)
          }
      }
      
    } catch (error) {
      toast.warn('Email ou Senha inválidos!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

   return(
    <>
    <div className="bg-roxo-300 shadow-inner p-10
    md:m-0 md:p-10 md:px-56">
    <form onSubmit={onSubmit} 
    className="flex flex-col justify-center p-5 gap-2 md:gap-5 bg-white rounded-sm md:p-20">
      <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold">Login</h2>

    <div className="my-3 ">
    <label htmlFor="tipo"
      className="block mb-2 text-sm text-cinza-900">
        Selecione uma opção:</label>
      <select
      id="tipo" name="tipo"
      className="text-cinza-900 text-sm rounded-lg w-32 p-2.5 border"
      value={tipo}
      onChange={(e) => setTipo(e.target.value)}>
        <option value="usuarios">Usuário</option>
        <option value="empresas">Empresa</option>
        <option value="ongs">Instituição</option>
      </select>
    </div>

      <div>
          <label htmlFor="email" 
          className="block mb-2 text-sm font-medium text-cinza-600">Email:</label>
          <input type="email" name="email" id="email" placeholder="Digite seu email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          className="bg-gray-600 text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
          focus:outline-none focus:border-roxo-300" required/>
      </div>
      <div>
        <label htmlFor="senha" 
        className="block mb-2 text-sm font-medium text-cinza-600">Senha:</label>
        <input type="password" name="senha" id="senha" placeholder="**********"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        className="bg-gray-600 text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
        <span className="font-light text-xs text-roxo-300 hover:cursor-pointer hover:underline" onClick={handleClick}>esqueci a senha</span>
      </div>

      <button type="submit" 
      className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3
      hover:bg-roxo-400 hover:scale-105">
        LOGIN
      </button>

      <hr className="text-roxo-500 mt-8 md:my-4" />
      <p className="text-center text-cinza-600">Primeira vez? <span className="text-roxo-300 hover:cursor-pointer hover:underline" onClick={cadastrar}>Cadastre-se</span></p>
    </form>
    </div>
    </>
   )
}

export default Login;