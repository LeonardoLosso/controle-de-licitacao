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
    this.formBusca.addControl('unidade', new FormControl(null));

    this.formBusca.addControl('dataInicial', new FormControl(null));
    this.formBusca.addControl('dataFinal', new FormControl(null));

    this.formBusca.addControl('dataAtaInicial', new FormControl(null));
    this.formBusca.addControl('dataAtaFinal', new FormControl(null));
  }

  public override obterDadosBusca() { }

  public override limparFiltros() {
    super.limparFiltros();
    this.obterControle('tipo').setValue(null);
    this.obterControle('unidade').setValue(null);

    this.obterControle('dataInicial').setValue(null);
    this.obterControle('dataFinal').setValue(null);

    this.obterControle('dataAtaInicial').setValue(null);
    this.obterControle('dataAtaFinal').setValue(null);
  }
}
