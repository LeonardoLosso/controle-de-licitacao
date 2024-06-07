import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AtaComponent } from './ata/ata.component';
import { MaterialModule } from '../core/material/material.module';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { FormBuscaAtaComponent } from './pesquisa/form-busca-ata/form-busca-ata.component';
import { LicitacaoTabelaComponent } from './pesquisa/licitacao-tabela/licitacao-tabela.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AtaComponent,
    PesquisaComponent,
    FormBuscaAtaComponent,
    LicitacaoTabelaComponent
  ],
  imports: [
    CommonModule,

    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ], exports: [
    AtaComponent,
    PesquisaComponent,
    FormBuscaAtaComponent,
    LicitacaoTabelaComponent
  ]
})
export class LicitacaoModule { }
