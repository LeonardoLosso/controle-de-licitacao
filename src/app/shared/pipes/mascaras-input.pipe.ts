import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mascarasInput'
})
export class MascarasInputPipe implements PipeTransform {

    transform(value: string, type: 'phone' | 'cpf-cnpj'): string {
        if (!value) return '';

        switch (type) {
            case 'phone':
                return this.formatPhone(value);
            case 'cpf-cnpj':
                return this.formatCpfCnpj(value);
            default:
                return value;
        }
    }

    private formatPhone(value: string): string {
        const cleaned = this.cleanNumber(value);
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else if (cleaned.length === 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return value;
    }

    private formatCpfCnpj(value: string): string {
        const cleaned = this.cleanNumber(value);
        if (cleaned.length === 11) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cleaned.length === 14) {
            return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        return value;
    }

    private cleanNumber(value: string): string {
        return value.replace(/[^\d]/g, '');
    }
}
