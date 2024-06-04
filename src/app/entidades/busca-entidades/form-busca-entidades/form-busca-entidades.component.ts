import { EnumTipoCadastro, EnumTipoStatus } from 'src/app/core/types/enum';
import { Component } from '@angular/core';
import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { TipoCadastro } from 'src/app/core/types/entidade';
import { TipoStatus } from 'src/app/core/types/auxiliares';

@Component({
    selector: 'app-form-busca-entidades',
    templateUrl: './form-busca-entidades.component.html',
    styleUrls: ['./form-busca-entidades.component.scss']
})
export class FormBuscaEntidadesComponent {

    options = EnumTipoCadastro;
    status = EnumTipoStatus;

    constructor(public formService: FormularioBuscaService) { }


    displayFn(val: TipoCadastro): string {
        return val && val.nome ? `${val.id} - ${val.nome}` : '';
    }

    displayFnStatus(val: TipoStatus): string {
        return val && val.nome ? `${val.nome}` : '';
    }
}
