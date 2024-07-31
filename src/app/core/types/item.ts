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
    quantidade: number,
    valorUnitario: number,
    valorTotal: number,
    desconto: number,
    duplicado?: boolean
}

export interface ItemDeReajuste {
    id: number,
    reajusteId: number,
    ataID: number
    nome: string,
    unidade: string,
    quantidade: number,
    valorUnitario: number,
    valorTotal: number
}

export interface ItemDeBaixa {
    id: number,
    baixaID: number,
    nome: string,
    unidade: string,

    qtdeEmpenhada: number, //totalização das notas?

    qtdeLicitada: number, //ja é preenchido da ATA
    qtdeAEmpenhar: number, //Quanto ainda falta para empenhar (empenhado - licitado)

    valorEmpenhado: number, //quantidade empenhada * valor unitário

    valorLicitado: number, //já preenchido vem da ATA
    saldo: number, //
    valorUnitario: number, // já vem preenchido vem preenchido da ATA
}

export interface ItemDeEmpenho {
    id: number,
    empenhoId: number, 
    baixaID: number,
    nome: string,
    unidade: string,
    qtdeEmpenhada: number,
    qtdeEntregue: number,
    qtdeAEntregar: number,
    valorEntregue: number,
    valorUnitario: number,
    itemDeBaixa: boolean,
    total: number
}

export interface ItemDeNota {
    id: number,
    nome: string,
    notaID: number,
    empenhoID: number,
    unidade: string,
    quantidade: number,
    valorUnitario: number,
    valorTotal: number
}
