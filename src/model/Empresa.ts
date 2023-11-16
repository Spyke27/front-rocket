interface Empresa {
    id: number;
    cnpj: string;
    nome: string;
    email: string;
    senha: string;
    cadastro: string;
    sobre: string;
    logo?: string | null;
}

export default Empresa;