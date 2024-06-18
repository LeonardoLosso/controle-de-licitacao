import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormularioBuscaBaseService } from 'src/app/core/services/formulario-busca-base.service';

@Injectable({
    providedIn: 'root'
})
export class FormularioBuscaService extends FormularioBuscaBaseService {

    constructor() {
        super();
        this.formBusca.addControl('tipo', new FormControl(null));
        this.formBusca.addControl('cidade', new FormControl(null));
    }

    public override obterDadosBusca(): any[] {
        return [
            { key: 'status', value: this.obterControle('status').value?.id },
            { key: 'tipo', value: this.obterControle('tipo').value?.id },
            { key: 'cidade', value: this.obterControle('cidade').value }
        ]
    }

    public override limparFiltros() {
        super.limparFiltros();
        this.obterControle('tipo').setValue(null);
        this.obterControle('cidade').setValue(null);
    }
}
