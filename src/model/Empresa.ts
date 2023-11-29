import User from "./User";
import Endereco from "./Endereco";

interface Empresa {
    id: number;
    cnpj: string;
    nome: string;
    email: string;
    senha: string;
    cadastro: string;
    sobre: string;
    logo?: string | null;
    site?: string | null;
    instagram?: string | null;


    Users?: User[] | null;
    Endereco?: Endereco | null;
}

export default Empresa;