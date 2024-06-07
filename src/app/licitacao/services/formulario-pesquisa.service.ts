import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormularioBuscaBaseService } from 'src/app/core/services/formulario-busca-base.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioPesquisaService extends FormularioBuscaBaseService {
  constructor() {
    super();
    this.formBusca.addControl('tipo', new FormControl(null));
    this.formBusca.addControl('cidade', new FormControl(null));
  }

  public override obterDadosBusca() { }

  public override limparFiltros() {
    super.limparFiltros();
    this.obterControle('tipo').setValue(null);
    this.obterControle('cidade').setValue(null);
  }
}
