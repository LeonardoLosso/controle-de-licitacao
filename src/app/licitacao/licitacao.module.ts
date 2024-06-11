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
import { CabecalhoAtaComponent } from './ata/cabecalho-ata/cabecalho-ata.component';
import { ItemAtaTabelaComponent } from './ata/item-ata-tabela/item-ata-tabela.component';
import { FormularioAtaComponent } from './ata/formulario-ata/formulario-ata.component';
import { ModalItemAtaComponent } from './ata/modal-item-ata/modal-item-ata.component';
import { BaixaComponent } from './baixa/baixa.component';
import { CabecalhoBaixaComponent } from './baixa/cabecalho-baixa/cabecalho-baixa.component';
import { FormularioBaixaComponent } from './baixa/formulario-baixa/formulario-baixa.component';
import { BaixaTabelaComponent } from './baixa/tabelas/baixa-tabela/baixa-tabela.component';
import { EmpenhoTabelaComponent } from './baixa/tabelas/empenho-tabela/empenho-tabela.component';



@NgModule({
  declarations: [
    AtaComponent,
    PesquisaComponent,
    FormBuscaAtaComponent,
    LicitacaoTabelaComponent,
    CabecalhoAtaComponent,
    ItemAtaTabelaComponent,
    FormularioAtaComponent,
    ModalItemAtaComponent,
    BaixaComponent,
    CabecalhoBaixaComponent,
    FormularioBaixaComponent,
    BaixaTabelaComponent,
    EmpenhoTabelaComponent,
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
