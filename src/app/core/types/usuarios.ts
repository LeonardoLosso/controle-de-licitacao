import { Endereco } from "./auxiliares"

export interface UsuarioSimplificado {
    id: number,
    status: number,
    nome: string,
    Usuario: string,
    cpf: string
}

export interface Usuario {
    id: number,
    status: number,
    nome: string,
    Usuario: string,
    cpf: string,
    email: string
    telefone: string
    Permissoes: Permissoes[] | null
    endereco: Endereco
}

export interface Permissoes {
    id: number,
    Tela: string,
    Recursos: Recursos[]
}

export interface Recursos {
    nome: string,
    Permissao: boolean
}