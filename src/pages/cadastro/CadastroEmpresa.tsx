import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { api } from "../../service/Service";
import { toast } from 'react-toastify';
import Empresa from "../../model/Empresa";

function CadastroEmpresa() {
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [verificaSenha, setVerificaSenha] = useState(false)
    const navigate = useNavigate()
    const [empresa, setEmpresa] = useState<Empresa>({
      id: 0,
      cnpj: '',
      nome: '',
      email: '',
      senha: '',
      cadastro: '',
      sobre: '',
    })

    useEffect(() => {
      document.title = 'Cadastro Empresa';
    }, []);

    const confirmarSenhaHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmarSenha(e.target.value)
    }

    useEffect(() => {
      if(confirmarSenha != empresa.senha){
        setVerificaSenha(true)
      } else {
        setVerificaSenha(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmarSenha])

    const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setEmpresa({
            ...empresa,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        if(confirmarSenha == empresa.senha){
            await api.post('/empresas/cadastrar', {
                ...empresa
            })
        } 
        else {
          toast.warn('As senhas devem ser iguais', {
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
            toast.success('Empresa cadastrada!', {
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
      <h2 className="text-cinza-700 text-center text-2xl md:text-4xl font-bold">Cadastro Empresa</h2>

      <div>
          <label htmlFor="cnpj" 
          className="block mb-2 text-sm font-medium text-cinza-600">*CNPJ:</label>
          <input type="text" name="cnpj" id="cnpj" 
          placeholder="99.999.999/9999-99"
          value={empresa.cnpj.replace(/\D+/g, '')} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          maxLength={14}
          className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
          focus:outline-none focus:border-roxo-300" required/>
      </div>

      <div>
          <label htmlFor="nome" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Nome:</label>
          <input type="text" name="nome" id="nome" 
            placeholder="Digite a razão social da empresa"
            value={empresa.nome} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required 
          />         
      </div>
      
      <div>
          <label htmlFor="email" 
          className="block mb-2 text-sm font-medium text-cinza-600">*Email:</label>
          <input type="email" name="email" id="email" 
          placeholder="Digite o email"
          value={empresa.email} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
          className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
          focus:outline-none focus:border-roxo-300" required/>
      </div>
      <div>
        <label htmlFor="senha" 
        className="block mb-2 text-sm font-medium text-cinza-600">*Senha:</label>
        <input type="password" name="senha" id="senha" placeholder="**********"
        value={empresa.senha}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
        minLength={6}
        className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
      </div>
      <div>
        <label htmlFor="confirmarSenha"
        className="block mb-2 text-sm font-medium text-cinza-600">*Confirmar senha:</label>
        <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="**********"
        value={confirmarSenha}
        onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
        minLength={6}
        className=" text-cinza-600 text-sm w-full p-2.5 border-2 border-cinza-300 
        focus:outline-none focus:border-roxo-300" required/>
        {verificaSenha? <p className="text-xs text-laranja-500">as senhas devem ser iguais</p> : ''}
      </div>

      <div>
          <label htmlFor="sobre" 
            className="block mb-2 text-sm font-medium text-cinza-600">*Sobre:</label>
          <input type="text" name="sobre" id="sobre" 
            placeholder="Conte um pouco sobre a instituição, valores, missão e seus propósitos aqui na rede"
            value={empresa.sobre}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            className=" text-cinza-600 text-sm w-full md:h-32 p-2.5 border-2 border-cinza-300 
            focus:outline-none focus:border-roxo-300" required 
          />         
      </div>

      <button type="submit" 
      className="flex items-center justify-center w-full bg-roxo-300 text-white text-sm py-2 md:py-3 rounded-sm mt-3
      hover:bg-roxo-400 hover:scale-105">
        Cadastrar
      </button>
    </form>
    </div>
    </>
   )
}

export default CadastroEmpresa;