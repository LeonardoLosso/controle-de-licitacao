import { Entidade } from "./entidade"
import { ItemDeAta } from "./item"

export interface AtaLicitacao {
    ID: string,
    Status: number,
    Tipo: number,
    Orgao: Entidade,
    Empresa: Entidade,
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date
    Vigencia: Date,
    TotalLicitado: number,
    Itens: ItemDeAta[]
}
export interface AtaLicitacaoSimplificada {
    ID: string,
    Status: number,
    Orgao: string,
    Empresa: string,
    Unidade: number,
    DataLicitacao: Date,
    DataAta: Date,
    TotalLicitado: number
}