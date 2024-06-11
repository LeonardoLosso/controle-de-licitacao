import { Entidade } from "./entidade"
import { ItemDeAta, ItemDeBaixa } from "./item"

export interface AtaLicitacao {
    ID: string,
    Status: number,
    Tipo: number,
    Orgao: Entidade,
    Empresa: Entidade,
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date
    Vigencia: Date,
    TotalLicitado: number,
    Itens: ItemDeAta[]
}
export interface AtaLicitacaoSimplificada {
    ID: string,
    Status: number,
    Orgao: string,
    Empresa: string,
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date,
    TotalLicitado: number
}
//------------------------------------------------
export interface BaixaLicitacao {
    ID: string,
    Status: number,
    DataLicitacao: Date,
    DataAta: Date,
    Vigencia: Date,
    Empresa: string,
    Orgao: string,
    Itens: ItemDeBaixa[],
    Empenhos: EmpenhoSimplificado[]
}

export interface Empenho {
    ID: string,
    IdAta: string,
    Status: number,
    DataEmpenho: Date,
    Saldo: number,
    Valor: number,
    Itens: ItemDeBaixa[],
    Empenhos: EmpenhoSimplificado[]
}

export interface EmpenhoSimplificado {
    ID: string,
    IdAta: string,
    Status: number,
    DataEmpenho: Date,
    Saldo: number,
    Valor: number
}