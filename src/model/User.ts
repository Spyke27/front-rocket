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
}

export default User;