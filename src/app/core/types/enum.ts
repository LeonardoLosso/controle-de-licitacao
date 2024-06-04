import { TipoStatus } from "./auxiliares";
import { TipoCadastro, UF } from "./entidade";

export const EnumTipoCadastro: TipoCadastro[] = [
    { id: 1, nome: 'Empresa' },
    { id: 2, nome: 'Órgão' },
    { id: 3, nome: 'Unidade' }
]

export const EnumUF: UF[] = [
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

export const EnumTipoStatus: TipoStatus[] = [
    { id: 0, nome: 'Ambos' },
    { id: 1, nome: 'Ativo' },
    { id: 2, nome: 'Inativo' }
]