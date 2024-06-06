import { Endereco } from "./auxiliares"

export interface UsuarioSimplificado {
    ID: number,
    Status: number,
    Nome: string,
    Usuario: string,
    CPF: string
}

export interface Usuario {
    ID: number,
    Status: number,
    Nome: string,
    Usuario: string,
    CPF: string,
    Email: string
    Telefone: string
    Permissoes: Permissoes[] | null
    Endereco: Endereco
}

export interface Permissoes {
    ID: number,
    Tela: string,
    Recursos: Recursos[]
}

export interface Recursos {
    Nome: string,
    Permissao: boolean
}