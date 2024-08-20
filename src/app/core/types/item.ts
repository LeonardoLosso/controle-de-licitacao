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
    qtdeLicitada: number,
    valorUnitario: number,
    valorLicitado: number,
    desconto: number,
    duplicado?: boolean // pra q caralhos isso serve???
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

    qtdeEmpenhada: number, //totalização das notas?

    qtdeLicitada: number, //ata.qtdeLicitada
    qtdeAEmpenhar: number, //Quanto ainda falta para empenhar (empenhado - licitado)

    valorEmpenhado: number, //qtdeEmpenhada * valor unitário

    valorLicitado: number, //ata.valorLicitado
    saldo: number, 
    valorUnitario: number, // ata.valorUnitario
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
    qtdeCaixa: number,
    valorCaixa: number,
    valorUnitario: number,
    valorTotal: number
}
