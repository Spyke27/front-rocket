interface Ong {
    id: number;
    cnpj?: string | null;
    nome: string;
    email: string;
    senha: string;
    cadastro: string;
    sobre?: string | null;
    logo?: string | null;
}

export default Ong;