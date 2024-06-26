import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscaEntidadesComponent } from './busca-entidades/busca-entidades.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { FormBuscaEntidadesComponent } from './busca-entidades/form-busca-entidades/form-busca-entidades.component';
import { EntidadeTabelaComponent } from './busca-entidades/entidade-tabela/entidade-tabela.component';
import { ModalEntidadeComponent } from './modal-entidade/modal-entidade.component';
import { LookupEntidadesComponent } from './lookup-entidades/lookup-entidades.component';
import { EntidadesRoutingModule } from './services/entidades-routing.module';



@NgModule({
  declarations: [
    BuscaEntidadesComponent,
    FormBuscaEntidadesComponent,
    EntidadeTabelaComponent,
    ModalEntidadeComponent,
    LookupEntidadesComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    EntidadesRoutingModule

  ],
  exports: [
    BuscaEntidadesComponent,
    EntidadeTabelaComponent,
    FormBuscaEntidadesComponent
  ]
})
export class EntidadesModule { }
