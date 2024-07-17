import { Component } from '@angular/core';

import { FormularioEmpenhoService } from '../../services/formulario-empenho.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario-empenho',
  templateUrl: './formulario-empenho.component.html',
  styleUrls: ['./formulario-empenho.component.scss']
})
export class FormularioEmpenhoComponent {

  constructor(
    public formService: FormularioEmpenhoService
  ) { }

  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.fantasia}` : '';
  }
}
