import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormularioBaixaService } from '../../services/formulario-baixa.service';

@Component({
  selector: 'app-formulario-baixa',
  templateUrl: './formulario-baixa.component.html',
  styleUrls: ['./formulario-baixa.component.scss']
})
export class FormularioBaixaComponent {

  constructor(
    public formService: FormularioBaixaService
  ) { }


  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.fantasia}` : '';
  }
}
