import { Entidade } from "./entidade"
import { ItemDeAta, ItemDeBaixa, ItemDeEmpenho, ItemDeReajuste } from "./item"

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
    id: number,
    edital: number,
    status: number,
    dataLicitacao: Date,
    dataAta: Date,
    vigencia: Date,
    empresa: string,
    orgao: string,
    itens: ItemDeBaixa[]
}

export interface Empenho {
    id: number,
    baixaId: number,
    edital: string,
    unidade: Entidade,
    orgao: Entidade,
    status: number,
    dataEmpenho: Date,
    saldo: number,
    valor: number,
    itens: ItemDeEmpenho[]
}

export interface EmpenhoSimplificado {
    id: number,
    baixaId: number,
    edital: string,
    unidade: Entidade,
    orgao: Entidade,
    status: number,
    dataEmpenho: Date,
    saldo: number,
    valor: number
}

export interface Notas{

}