import Causa from "./Causa";
import Ong from "./Ong";
import User from "./User";

interface Vaga {
    id: number;
    titulo: string;
    sobre: string;
    data: string;
    cadastro: string;
    qtd_vagas: number;
    causa_id: number;
    ong_id: number;
    capa?: string | null;
    causa?: Causa;
    ong?: Ong | null;
    voluntarios?: User[] | null;
}

export default Vaga;