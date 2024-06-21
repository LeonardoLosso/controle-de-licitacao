export interface MensagemModal {
    titulo: string,
    mensagem: string,
    item: string
}

export interface Endereco {
    cep: string,
    cidade: string,
    uf: string,
    bairro: string,
    logradouro: string,
    numero: string,
    complemento: string
}

export interface MudancasParaPatch {
    [op: string]: any;
    path: string;
    value?: any;
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

export interface Listagem <T>{
    page: 2,
    totalPage: 1,
    totalItems: 3,
    lista: T[]
}