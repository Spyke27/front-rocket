import Causa from "./Causa";
import Empresa from "./Empresa";
import Ong from "./Ong";

interface Vaga {
    id: number;
    titulo: string;
    sobre: string;
    data: string;
    cadastro: string;
    qtd_vagas: number;
    qtd_volun: number;
    causa_id: number;
    ong_id: number | null;
    empresa_id: number | null,
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    capa?: string | null;
    causa?: Causa;
    Ong?: Ong | null;
    Empresa?: Empresa | null;
}

export default Vaga;