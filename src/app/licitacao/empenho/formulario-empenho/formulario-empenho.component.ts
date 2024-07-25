import { Component } from '@angular/core';

import { FormularioEmpenhoService } from '../../services/formulario-empenho.service';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';

@Component({
  selector: 'app-formulario-empenho',
  templateUrl: './formulario-empenho.component.html',
  styleUrls: ['./formulario-empenho.component.scss']
})
export class FormularioEmpenhoComponent {
  public lookupDeEntidades = LookupEntidadesComponent;

  constructor(
    public formService: FormularioEmpenhoService
  ) { }

}
