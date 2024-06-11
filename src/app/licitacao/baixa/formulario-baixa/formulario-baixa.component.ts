import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormularioBaixaService } from '../../services/formulario-baixa.service';

@Component({
  selector: 'app-formulario-baixa',
  templateUrl: './formulario-baixa.component.html',
  styleUrls: ['./formulario-baixa.component.scss']
})
export class FormularioBaixaComponent implements OnInit {

  constructor(
    public formService: FormularioBaixaService
  ) { }

  ngOnInit(): void { }

  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.ID} - ${control.value?.Nome}` : '';
  }
}
