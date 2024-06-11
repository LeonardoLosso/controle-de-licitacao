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
    Quantidade: number,
    ValorUnitario: number,
    ValorTotal: number,
    Desconto: number
}
