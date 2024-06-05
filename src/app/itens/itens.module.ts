import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscaItensComponent } from './busca-itens/busca-itens.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { ItemTabelaComponent } from './busca-itens/item-tabela/item-tabela.component';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { FormBuscaItensComponent } from './busca-itens/form-busca-itens/form-busca-itens.component';



@NgModule({
  declarations: [
    BuscaItensComponent,
    ItemTabelaComponent,
    ModalItemComponent,
    FormBuscaItensComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    BuscaItensComponent,
    ItemTabelaComponent,
    ModalItemComponent,
    FormBuscaItensComponent
  ]
})
export class ItensModule { }
