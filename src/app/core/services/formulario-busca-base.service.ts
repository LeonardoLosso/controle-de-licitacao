import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioBuscaBaseService {

  public formBusca!: FormGroup;

  constructor() {
    this.formBusca = new FormGroup({
      pesquisa: new FormControl(''),
      status: new FormControl(null),
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

  public obterDadosBusca() { }

  public limparFiltros() {
    this.obterControle('status').setValue(null);
  }
}
