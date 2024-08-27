import { Pipe, PipeTransform } from '@angular/core';
import { EnumTipoCadastro } from 'src/app/core/types/enum';

@Pipe({
    name: 'formataEnum'
})
export class FormataEnumPipe implements PipeTransform {

    transform(id: number, type: 'tipo' | 'status'): string {

        if (!id) return '';

        switch (type) {
            case 'tipo':
                const cadastro = EnumTipoCadastro.find(item => item.id === id);
                return cadastro ? `${cadastro.id} - ${cadastro.nome}` : 'Desconhecido';

            case 'status':
                return id === 1? '🟢' : '🔴';
            
            default: 
                return '';
        }
    }

}
