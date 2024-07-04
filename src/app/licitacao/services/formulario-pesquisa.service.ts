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

  public override obterDadosBusca(): {key: string, value: any}[] { 
    return [
      { key: 'status', value: this.obterControle('status').value?.id },
      { key: 'tipo', value: this.obterControle('tipo').value?.id },
      { key: 'unidade', value: this.obterControle('unidade').value?.id },
      { key: 'dataInicial', value: this.obterControle('dataInicial').value },
      { key: 'dataFinal', value: this.obterControle('dataFinal').value },
      { key: 'dataAtaInicial', value: this.obterControle('dataAtaInicial').value },
      { key: 'dataAtaFinal', value: this.obterControle('dataAtaFinal').value }
    ]
  }

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
