import { Entidade } from "./entidade"
import { ItemDeAta, ItemDeBaixa } from "./item"

export interface AtaLicitacao {
    id: string,
    status: number,
    tipo: number,
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
    id: string,
    status: number,
    Orgao: string,
    Empresa: string,
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date,
    TotalLicitado: number
}
//------------------------------------------------
export interface BaixaLicitacao {
    id: string,
    status: number,
    DataLicitacao: Date,
    DataAta: Date,
    Vigencia: Date,
    Empresa: string,
    Orgao: string,
    Itens: ItemDeBaixa[],
    Empenhos: EmpenhoSimplificado[]
}

export interface Empenho {
    id: string,
    IdAta: string,
    status: number,
    DataEmpenho: Date,
    Saldo: number,
    Valor: number,
    Itens: ItemDeBaixa[],
    Empenhos: EmpenhoSimplificado[]
}

export interface EmpenhoSimplificado {
    id: string,
    IdAta: string,
    status: number,
    DataEmpenho: Date,
    Saldo: number,
    Valor: number
}