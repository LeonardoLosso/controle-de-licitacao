export interface MensagemModal{
    titulo: string,
    mensagem: string,
    item: string
}

export interface TipoStatus {
    id: number,
    nome: string
}

export interface UF {
    id: string,
    nome: string
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