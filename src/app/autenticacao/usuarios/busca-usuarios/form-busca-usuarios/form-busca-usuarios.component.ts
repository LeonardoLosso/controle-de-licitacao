import { Component } from '@angular/core';
import { FormularioBuscaService } from 'src/app/autenticacao/services/formulario-busca.service';
import { TipoStatus } from 'src/app/core/types/auxiliares';
import { EnumTipoStatus } from 'src/app/core/types/enum';

@Component({
  selector: 'app-form-busca-usuarios',
  templateUrl: './form-busca-usuarios.component.html',
  styleUrls: ['./form-busca-usuarios.component.scss']
})
export class FormBuscaUsuariosComponent {
  status = EnumTipoStatus;

  constructor(public formService: FormularioBuscaService) { }

  displayFnStatus(val: TipoStatus): string {
    return val && val.nome ? `${val.nome}` : '';
  }
}
