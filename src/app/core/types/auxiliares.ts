export interface MensagemModal {
    titulo: string,
    mensagem: string,
    item: string
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


//-----------[DROPDOWN MODEL]------------

export interface EnumNumberID {
    id: number,
    nome: string
}

export interface EnumStringID {
    id: string,
    nome: string
}