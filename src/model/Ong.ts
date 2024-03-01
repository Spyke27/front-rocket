import Endereco from "./Endereco";

interface Ong {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cadastro: string;
    sobre: string;
    site: string;
    logo?: string | null;

    Endereco?: Endereco | null;
}

export default Ong;