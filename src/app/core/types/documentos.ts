import { Entidade } from "./entidade"
import { ItemDeAta, ItemDeBaixa, ItemDeReajuste } from "./item"

export interface AtaLicitacao {
    id: number,
    edital: string,
    status: number,
    tipo: number,
    orgao: Entidade,
    empresa: Entidade,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date
    vigencia: Date,
    totalLicitado: number,
    itens: ItemDeAta[]
    totalReajustes: number
}
export interface AtaLicitacaoSimplificada {
    id: number,
    edital: string,
    status: number,
    orgao: string,
    empresa: string,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date,
    totalLicitado: number
}
export interface Reajuste{
    id: number,
    ataID: number
    data:Date,
    itens: ItemDeReajuste[]
}
//------------------------------------------------
export interface BaixaLicitacao {
    id: string,
    status: number,
    dataLicitacao: Date,
    dataAta: Date,
    vigencia: Date,
    empresa: string,
    orgao: string,
    itens: ItemDeBaixa[],
    Empenhos: EmpenhoSimplificado[]
}

export interface Empenho {
    id: string,
    IdAta: string,
    status: number,
    DataEmpenho: Date,
    Saldo: number,
    Valor: number,
    itens: ItemDeBaixa[],
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