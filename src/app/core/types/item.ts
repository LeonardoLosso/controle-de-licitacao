import { ICadastro } from "./auxiliares"

export interface ItemSimplificado {
    id: number,
    status: number,
    ehCesta: boolean,
    nome: string,
    unidadePrimaria: string,
    unidadeSecundaria: string
}

export interface Item extends ICadastro{
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
    ataId: number
    nome: string,
    unidade: string,
    Quantidade: number,
    ValorUnitario: number,
    ValorTotal: number,
    Desconto: number
}

export interface ItemDeBaixa {
    id: number,
    nome: string,
    unidade: string,

    QtdeEmpenhada: number, //totalização das notas?

    QtdeLicitada: number, //ja é preenchido com esses valores lá da ATA
    QtdeAEmpenhar: number, //Quanto ainda falta para empenhar (empenhado - licitado)

    ValorEmpenhado: number, //quantidade empenhada * valor unitário

    ValorLicitado: number, //já preenchido vem da ATA
    Saldo: number, //
    ValorUnitario: number, // já vem preenchido vem preenchido da ATA
}
