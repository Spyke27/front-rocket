import Empresa from "./Empresa";
import Vaga from "./Vaga";

interface User {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    telefone: string;
    cadastro: string;
    data_nasc: string;
    empresa_id: number;
    avatar?: string | null;
    Vaga?: Vaga | null
    Empresa?: Empresa | null
}

export default User;