import { Component } from '@angular/core';

import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { EnumTipoStatus } from 'src/app/core/types/enum';
import { EnumNumberID } from 'src/app/core/types/auxiliares';

@Component({
  selector: 'app-form-busca-itens',
  templateUrl: './form-busca-itens.component.html',
  styleUrls: ['./form-busca-itens.component.scss']
})
export class FormBuscaItensComponent {
  status = EnumTipoStatus;
  tipoItem: string[] = ['Cesta', 'Item'];
  constructor(public formService: FormularioBuscaService) { }

  displayFnStatus(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }
}
