import { Component } from '@angular/core';

import { FormularioPesquisaService } from '../../services/formulario-pesquisa.service';
import { EnumTipoCadastro, EnumTipoDocumento, EnumTipoStatus } from 'src/app/core/types/enum';
import { EnumNumberID } from 'src/app/core/types/auxiliares';

@Component({
  selector: 'app-form-busca-ata',
  templateUrl: './form-busca-ata.component.html',
  styleUrls: ['./form-busca-ata.component.scss']
})
export class FormBuscaAtaComponent {

  options = EnumTipoCadastro;
  status = EnumTipoStatus;
  tipoDoc = EnumTipoDocumento;

  constructor(public formService: FormularioPesquisaService) { }

  displayStatus(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }

  displayTipo(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }

  displayUnidade(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }
}
