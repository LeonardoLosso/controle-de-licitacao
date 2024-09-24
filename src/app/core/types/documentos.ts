import { Entidade } from "./entidade"
import { ItemDeAta, ItemDeBaixa, ItemDeEmpenho, ItemDeNota, ItemDeReajuste } from "./item"

export interface AtaLicitacao {
    id: number,
    responsavel: string,
    edital: string,
    status: number,
    orgao: Entidade,
    empresa: Entidade,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date
    vigencia: Date,
    itens: ItemDeAta[]
    totalReajustes: number
}
export interface AtaLicitacaoSimplificada {
    id: number,
    responsavel: string,
    edital: string,
    status: number,
    orgao: string,
    empresa: string,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date,
    totalLicitado: number
}
export interface Reajuste {
    id: number,
    ataID: number
    data: Date,
    itens: ItemDeReajuste[]
}
//------------------------------------------------
export interface BaixaLicitacao {
    id: number,
    responsavel: string,
    edital: number,
    status: number,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date,
    vigencia: Date,
    empresa: string,
    orgao: string,
    itens: ItemDeBaixa[]
}

export interface BaixaPolicia {
    id: number,
    responsavel: string,
    edital: number,
    status: number,
    unidade: number,
    dataLicitacao: Date,
    dataAta: Date,
    vigencia: Date,
    empresa: string,
    orgao: string,
    valorLicitado: number,
    valorEmpenhado: number,
    valorEntregue: number,
    empenhos: EmpenhoPolicia[]
}

export interface Empenho {
    id: number,
    numEmpenho: string,
    baixaID: number,
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
    numEmpenho: string,
    baixaID: number,
    edital: string,
    unidade: Entidade,
    orgao: Entidade,
    status: number,
    dataEmpenho: Date,
    saldo: number,
    valor: number
}

export interface EmpenhoPolicia {
    id: number,
    numEmpenho: string,
    numNota: string,
    baixaID: number,
    edital: string,
    dataEmpenho: Date,
    valor: number
}

export interface Nota {
    id: number,
    ehPolicia: boolean,
    numNota: string,
    empenhoID: number,
    numEmpenho: string,
    baixaID: number,
    edital: string,
    unidade: Entidade,
    dataEmissao: Date,
    dataEntrega: Date,
    itens: ItemDeNota[]
}

export interface NotaSimplificada {
    id: number,
    numNota: string,
    empenhoID: number,
    numEmpenho: string,
    unidade: Entidade,
    dataEmissao: Date,
    dataEntrega: Date,
    valorEntregue: number
}