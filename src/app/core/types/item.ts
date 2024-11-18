import { ICadastro } from "./auxiliares"

export interface ItemSimplificado {
    id: number,
    status: number,
    ehCesta: boolean,
    nome: string,
    unidadePrimaria: string,
    unidadeSecundaria: string
}

export interface Item extends ICadastro {
    id: number,
    status: number,
    ehCesta: boolean,
    nome: string,
    unidadePrimaria: string,
    unidadeSecundaria: string,
    listaItens: ItemSimplificado[]
    listaNomes: string[]
}

export interface ItemDeAta {
    id: number,
    ataID: number
    nome: string,
    unidade: string,
    qtdeLicitada: number | null,
    valorUnitario: number | null,
    valorLicitado: number,
    desconto: number,
}

export interface ItemDeReajuste {
    id: number,
    reajusteId: number,
    ataID: number
    nome: string,
    unidade: string,
    qtdeLicitada: number,
    valorUnitario: number,
    valorLicitado: number
}

export interface ItemDeBaixa {
    id: number,
    baixaID: number,
    nome: string,
    unidade: string,

    qtdeEmpenhada: number,

    qtdeLicitada: number,
    qtdeAEmpenhar: number,
    valorEmpenhado: number,

    valorLicitado: number,
    saldo: number,
    valorUnitario: number,
}

export interface ItemDeEmpenho {
    id: number,
    empenhoId: number,
    baixaID: number,
    nome: string,
    unidade: string,
    qtdeEmpenhada: number | null,
    qtdeEntregue: number,
    qtdeAEntregar: number,
    valorEntregue: number,
    valorUnitario: number | null,
    itemDeBaixa: boolean,
    total: number
}

export interface ItemDeNota {
    id: number,
    nome: string,
    notaID: number,
    empenhoID: number,
    unidade: string,
    quantidade: number | null,
    qtdeCaixa: number | null,
    valorCaixa: number | null,
    valorUnitario: number,
    valorTotal: number
}
