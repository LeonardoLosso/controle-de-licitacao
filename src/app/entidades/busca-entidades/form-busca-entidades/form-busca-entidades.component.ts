import { EnumTipoCadastro, EnumTipoStatus } from 'src/app/core/types/enum';
import { Component } from '@angular/core';
import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { EnumNumberID } from 'src/app/core/types/auxiliares';

@Component({
    selector: 'app-form-busca-entidades',
    templateUrl: './form-busca-entidades.component.html',
    styleUrls: ['./form-busca-entidades.component.scss']
})
export class FormBuscaEntidadesComponent {

    options = EnumTipoCadastro;
    status = EnumTipoStatus;

    constructor(public formService: FormularioBuscaService) { }


    displayFn(val: EnumNumberID): string {
        return val && val.nome ? `${val.nome}` : '';
    }

    displayFnStatus(val: EnumNumberID): string {
        return val && val.nome ? `${val.nome}` : '';
    }
}
