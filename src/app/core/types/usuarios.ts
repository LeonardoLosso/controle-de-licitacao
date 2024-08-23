import { Endereco, ICadastro } from "./auxiliares"

export interface UsuarioSimplificado {
    id: number,
    status: number,
    nome: string,
    userName: string,
    telefone: string,
    email: string
}

export interface Usuario extends ICadastro{
    id: number,
    password: string,
    rePassword: string
    userName: string,
    nome: string,
    status: number,
    cpf: string,
    email: string
    telefone: string
    permissoes: Permissoes[]
    endereco: Endereco
}

export interface Permissoes {
    id: number,
    tela: string,
    recursos: Recursos[]
}

export interface Recursos {
    id: number,
    nomeRecurso: string,
    permissaoRecurso: boolean
}

export interface PessoaUsuaria {
    userName: string,
    recursos: number[],
    exp: number
}