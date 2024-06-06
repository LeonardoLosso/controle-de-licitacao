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
