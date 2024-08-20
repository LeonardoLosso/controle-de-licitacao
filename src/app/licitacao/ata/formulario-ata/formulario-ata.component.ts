import { Component, Input } from '@angular/core';

import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { EnumTipoCadastro } from 'src/app/core/types/enum';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';

@Component({
  selector: 'app-formulario-ata',
  templateUrl: './formulario-ata.component.html',
  styleUrls: ['./formulario-ata.component.scss']
})
export class FormularioAtaComponent {
  @Input() formService!: any
  @Input() formEdit = true;

  public options = EnumTipoCadastro;
  public lookupDeEntidades = LookupEntidadesComponent;
  
  constructor(
  ) { }


  displayUnidade(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }

  desabilitado(): boolean{
    return !this.formEdit;
  }
}
