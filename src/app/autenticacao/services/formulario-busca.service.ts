import { Injectable } from '@angular/core';

import { FormularioBuscaBaseService } from 'src/app/core/services/formulario-busca-base.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioBuscaService extends FormularioBuscaBaseService {

  constructor() {
    super();
  }

  public override obterDadosBusca() { }

  public override limparFiltros() {
    super.limparFiltros();
  }
}
