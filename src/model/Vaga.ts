import Causa from "./Causa";
import Empresa from "./Empresa";
import Ong from "./Ong";
import User from "./User";

interface Vaga {
    id: number;
    titulo: string;
    sobre: string;
    data: string;
    duracao: number;
    impacto: number;
    cadastro?: string;
    qtd_vagas: number;
    qtd_volun: number;
    causa_id: number;
    ods_id: number;
    politica_id: number;
    disponivel: boolean;
    finalizada: boolean;
    ong_id: number | null;
    empresa_id: number | null,
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    capa?: string | null;
    
    Causa?: Causa;
    Odss?: Causa;
    Ong?: Ong | null;
    Empresas?: Empresa[] | null;
    Users?: User[] | null;
}

export default Vaga;