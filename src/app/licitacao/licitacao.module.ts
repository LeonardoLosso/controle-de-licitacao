import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { LicitacaoRoutingModule } from './services/licitacao-routing.module';
import { HistoricoComponent } from './ata/historico/historico.component';
import { EmpenhoComponent } from './empenho/empenho.component';
import { CabecalhoEmpenhoComponent } from './empenho/cabecalho-empenho/cabecalho-empenho.component';
import { FormularioEmpenhoComponent } from './empenho/formulario-empenho/formulario-empenho.component';
import { EmpenhoTabelaItensComponent } from './empenho/empenho-tabela-itens/empenho-tabela-itens.component';
import { EmpenhoTabelaNotasComponent } from './empenho/empenho-tabela-notas/empenho-tabela-notas.component';
import { ModalItemEmpenhoComponent } from './empenho/modal-item-empenho/modal-item-empenho.component';
import { LookupItemEmpenhoComponent } from './empenho/modal-item-empenho/lookup-item-empenho/lookup-item-empenho.component';
import { ModalNotaComponent } from './notas/modal-nota/modal-nota.component';
import { ItemNotaTabelaComponent } from './notas/item-nota-tabela/item-nota-tabela.component';
import { LookupItemNotaComponent } from './notas/lookup-item-nota/lookup-item-nota.component';



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
    HistoricoComponent,
    EmpenhoComponent,
    CabecalhoEmpenhoComponent,
    FormularioEmpenhoComponent,
    EmpenhoTabelaItensComponent,
    EmpenhoTabelaNotasComponent,
    ModalItemEmpenhoComponent,
    LookupItemEmpenhoComponent,
    ModalNotaComponent,
    ItemNotaTabelaComponent,
    LookupItemNotaComponent,
  ],
  imports: [
    CommonModule,

    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    LicitacaoRoutingModule
  ], exports: [
    AtaComponent,
    PesquisaComponent,
    FormBuscaAtaComponent,
    LicitacaoTabelaComponent
  ]
})
export class LicitacaoModule { }
