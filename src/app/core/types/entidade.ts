import { Endereco } from "./auxiliares"

export interface EntidadeSimplificada {
    id: number,
    status: number,
    fantasia: string,
    tipo: number,
    cnpj: string,
    telefone: string,
    email: string
}

export interface Entidade {
    id: number,
    status: number,
    nome: string,
    fantasia: string,
    tipo: number,
    cnpj: string,
    ie: string,
    telefone: string,
    email: string,
    endereco: Endereco
}
