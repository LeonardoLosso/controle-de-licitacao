import { EnumNumberID, EnumStringID } from "./auxiliares";

export const EnumUF: EnumStringID[] = [
    { id: 'AC', nome: 'Acre' },
    { id: 'AL', nome: 'Alagoas' },
    { id: 'AM', nome: 'Amazonas' },
    { id: 'AP', nome: 'Amapá' },
    { id: 'BA', nome: 'Bahia' },
    { id: 'CE', nome: 'Ceará' },
    { id: 'DF', nome: 'Distrito Federal' },
    { id: 'ES', nome: 'Espírito Santo' },
    { id: 'GO', nome: 'Goiás' },
    { id: 'MA', nome: 'Maranhão' },
    { id: 'MG', nome: 'Minas Gerais' },
    { id: 'MS', nome: 'Mato Grosso do Sul' },
    { id: 'MT', nome: 'Mato Grosso' },
    { id: 'PA', nome: 'Pará' },
    { id: 'PB', nome: 'Paraíba' },
    { id: 'PE', nome: 'Pernambuco' },
    { id: 'PI', nome: 'Piauí' },
    { id: 'PR', nome: 'Paraná' },
    { id: 'RJ', nome: 'Rio de Janeiro' },
    { id: 'RN', nome: 'Rio Grande do Norte' },
    { id: 'RO', nome: 'Rondônia' },
    { id: 'RR', nome: 'Roraima' },
    { id: 'RS', nome: 'Rio Grande do Sul' },
    { id: 'SC', nome: 'Santa Catarina' },
    { id: 'SE', nome: 'Sergipe' },
    { id: 'SP', nome: 'São Paulo' },
    { id: 'TO', nome: 'Tocantins' }
]

export const EnumTipoCadastro: EnumNumberID[] = [
    { id: 1, nome: 'Empresa' },
    { id: 2, nome: 'Prefeitura' },
    { id: 3, nome: 'Policia' },
    { id: 4, nome: 'Secretaria' },
    { id: 5, nome: 'Assistência social' },
    { id: 6, nome: 'Batalhão' },
    { id: 7, nome: 'Hospital' },
    { id: 8, nome: 'Escola' }
]

export const EnumTipoStatus: EnumNumberID[] = [
    { id: 1, nome: 'Ativo' },
    { id: 2, nome: 'Inativo' }
]

export const EnumTipoDocumento: EnumNumberID[] = [
    { id: 2, nome: 'Prefeitura' },
    { id: 3, nome: 'Policia' }
]