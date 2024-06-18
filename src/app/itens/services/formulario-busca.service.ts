import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormularioBuscaBaseService } from 'src/app/core/services/formulario-busca-base.service';


@Injectable({
  providedIn: 'root'
})
export class FormularioBuscaService extends FormularioBuscaBaseService {

  constructor() {
    super();
    this.formBusca.addControl('unidadePri', new FormControl(null));
    this.formBusca.addControl('unidadeSec', new FormControl(null));
    this.formBusca.addControl('ehCesta', new FormControl(null));
  }
  public override obterDadosBusca(): {key: string, value: any}[] { return [] }

  public override limparFiltros() {
    super.limparFiltros();
    this.obterControle('unidadePri').setValue(null);
    this.obterControle('unidadeSec').setValue(null);
    this.obterControle('ehCesta').setValue(null);
  }

}
