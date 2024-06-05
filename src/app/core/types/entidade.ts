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

export interface Endereco {
    CEP: string,
    Cidade: string,
    UF: string,
    Bairro: string,
    Logradouro: string,
    Numero: string,
    Complemento: string
}

export interface TipoCadastro {
    id: number,
    nome: string
}
export interface UF {
    id: string,
    nome: string
}
