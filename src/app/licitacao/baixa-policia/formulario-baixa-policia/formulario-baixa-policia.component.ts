import { Component } from '@angular/core';
import { FormularioBaixaPoliciaService } from '../../services/formulario-baixa-policia.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario-baixa-policia',
  templateUrl: './formulario-baixa-policia.component.html',
  styleUrls: ['./formulario-baixa-policia.component.scss']
})
export class FormularioBaixaPoliciaComponent {
  constructor(
    public formService: FormularioBaixaPoliciaService
  ) { }


  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.fantasia}` : '';
  }
}
