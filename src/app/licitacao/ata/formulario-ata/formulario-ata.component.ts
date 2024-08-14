import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormularioAtaService } from '../../services/formulario-ata.service';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { EnumTipoDocumento } from 'src/app/core/types/enum';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';

@Component({
  selector: 'app-formulario-ata',
  templateUrl: './formulario-ata.component.html',
  styleUrls: ['./formulario-ata.component.scss']
})
export class FormularioAtaComponent implements OnInit{

  public options = EnumTipoDocumento;
  public statusControl!: FormControl<number>;
  public lookupDeEntidades = LookupEntidadesComponent;
  
  constructor(
    public formService: FormularioAtaService
  ) { }

  ngOnInit(): void {
    this.statusControl = this.formService.obterControle<number>('status');
  }

  displayUnidade(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }

  desabilitado(): boolean{
    return this.statusControl.value === 2;
  }
}
