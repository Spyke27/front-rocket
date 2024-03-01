interface Relatorio {
    usuariosCadastrados: number;
    tempoVoluntariado: number;
    tempoVoluntariadoIndividual: number;
    pessoasImpactadas: number;
    rankCausas: string[],
    rankOds: string[],
    rankPoliticas: string[],
    qtdVagas: number;
}

export default Relatorio;