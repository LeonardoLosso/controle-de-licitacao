import { Endereco } from "./auxiliares"

export interface EntidadeSimplificada {
    ID: number,
    Status: number,
    Fantasia: string,
    Tipo: number,
    CNPJ: string,
    Telefone: string,
    Email: string
}

export interface Entidade {
    ID: number,
    Status: number,
    Nome: string,
    Fantasia: string,
    Tipo: number,
    CNPJ: string,
    IE: string,
    Telefone: string,
    Email: string,
    Endereco: Endereco
}

export interface TipoCadastro {
    id: number,
    nome: string
}

