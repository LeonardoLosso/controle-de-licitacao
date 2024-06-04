import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormularioBuscaService {

    public formBusca!: FormGroup;

    constructor() {
        this.formBusca = new FormGroup({
            pesquisa: new FormControl(''),
            tipo: new FormControl(null),
            status: new FormControl(null),
            cidade: new FormControl(null),
            selecionadoGrid: new FormControl(null)
        });
    }

    public obterControle<T>(nome: string): FormControl {
        const control = this.formBusca.get(nome);
        if (!control) {
            throw new Error(`FormControl com nome "${nome}" não existe.`);
        }
        return control as FormControl<T>;
    }

    obterDadosBusca() { }

    limparFiltros(){
        this.obterControle('tipo').setValue(null);
        this.obterControle('status').setValue(null);
        this.obterControle('cidade').setValue(null);
    }
}
