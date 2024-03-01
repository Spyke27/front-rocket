interface RelatorioGeral {
    pessoasImpactadas: number;
    tempoVoluntariado: number;
    vagas: number;
    usuarios: number;
    empresas: number;
    instituicoes: number;
    rankCausas: string[],
    rankOds: string[],
    rankPoliticas: string[]
}

export default RelatorioGeral;