export interface ItemSimplificado {
    ID: number,
    Status: number,
    EhCesta: boolean,
    Nome: string,
    UnidadePrimaria: string,
    UnidadeSecundaria: string
}

export interface Item {
    ID: number,
    Status: number,
    EhCesta: boolean,
    Nome: string,
    UnidadePrimaria: string,
    UnidadeSecundaria: string,
    ListaItens: ItemSimplificado[] | null
    ListaNomes: string[]
}

export interface ItemDeAta {
    ID: number,
    Nome: string,
    Unidade: string,
    Quantidade: number,
    ValorUnitario: number,
    ValorTotal: number,
    Desconto: number
}

export interface ItemDeBaixa {
    ID: number,
    Nome: string,
    Unidade: string,

    QtdeEmpenhada: number, //totalização das notas?

    QtdeLicitada: number, //ja é preenchido com esses valores lá da ATA
    QtdeAEmpenhar: number, //Quanto ainda falta para empenhar (empenhado - licitado)

    ValorEmpenhado: number, //quantidade empenhada * valor unitário

    ValorLicitado: number, //já preenchido vem da ATA
    Saldo: number, //
    ValorUnitario: number, // já vem preenchido vem preenchido da ATA
}
