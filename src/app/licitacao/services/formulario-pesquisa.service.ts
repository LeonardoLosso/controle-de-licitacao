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
    const inicial = this.obterControle<Date>('dataInicial').value as Date;
    const final = this.obterControle<Date>('dataFinal').value as Date;
    const ataInicial = this.obterControle<Date>('dataAtaInicial').value as Date;
    const ataFinal = this.obterControle<Date>('dataAtaFinal').value as Date;

    const dataInicial = inicial?.toISOString();
    const dataFinal = final?.toISOString();
    const dataAtaInicial = ataInicial?.toISOString();
    const dataAtaFinal = ataFinal?.toISOString();
    
    return [
      { key: 'status', value: this.obterControle('status').value?.id },
      { key: 'tipo', value: this.obterControle('tipo').value?.id },
      { key: 'unidade', value: this.obterControle('unidade').value?.id },
      { key: 'dataInicial',  value: dataInicial},
      { key: 'dataFinal', value: dataFinal },
      { key: 'dataAtaInicial', value: dataAtaInicial },
      { key: 'dataAtaFinal', value: dataAtaFinal }
    ]
  }
}
