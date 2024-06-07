export interface AtaLicitacao {
    ID: string,
    Status: number,
    Tipo: number,
    Orgao: string
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date
    Vigencia: Date,
    TotalLicitado: number
}
export interface AtaLicitacaoSimplificada {
    ID: string,
    Status: number,
    Orgao: string
    Unidade: number,
    DataLicitacao: Date,
    Vigencia: Date,
    TotalLicitado: number
}