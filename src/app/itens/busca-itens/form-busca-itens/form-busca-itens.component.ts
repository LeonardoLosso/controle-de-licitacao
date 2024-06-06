import { Component } from '@angular/core';
import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { EnumTipoStatus } from 'src/app/core/types/enum';
import { TipoStatus } from 'src/app/core/types/auxiliares';

@Component({
  selector: 'app-form-busca-itens',
  templateUrl: './form-busca-itens.component.html',
  styleUrls: ['./form-busca-itens.component.scss']
})
export class FormBuscaItensComponent {
  status = EnumTipoStatus;
  tipoItem: string[] = ['Ambos', 'Cesta', 'Item'];
  constructor(public formService: FormularioBuscaService) { }

  displayFnStatus(val: TipoStatus): string {
    return val && val.nome ? `${val.nome}` : '';
  }
}
