export interface ItemSimplificado {
    id: number,
    status: number,
    EhCesta: boolean,
    nome: string,
    UnidadePrimaria: string,
    UnidadeSecundaria: string
}

export interface Item {
    id: number,
    status: number,
    EhCesta: boolean,
    nome: string,
    UnidadePrimaria: string,
    UnidadeSecundaria: string,
    ListaItens: ItemSimplificado[] | null
    ListaNomes: string[]
}

export interface ItemDeAta {
    id: number,
    nome: string,
    Unidade: string,
    Quantidade: number,
    ValorUnitario: number,
    ValorTotal: number,
    Desconto: number
}

export interface ItemDeBaixa {
    id: number,
    nome: string,
    Unidade: string,

    QtdeEmpenhada: number, //totalização das notas?

    QtdeLicitada: number, //ja é preenchido com esses valores lá da ATA
    QtdeAEmpenhar: number, //Quanto ainda falta para empenhar (empenhado - licitado)

    ValorEmpenhado: number, //quantidade empenhada * valor unitário

    ValorLicitado: number, //já preenchido vem da ATA
    Saldo: number, //
    ValorUnitario: number, // já vem preenchido vem preenchido da ATA
}
