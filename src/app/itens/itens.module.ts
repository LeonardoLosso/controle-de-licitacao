import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuscaItensComponent } from './busca-itens/busca-itens.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { ItemTabelaComponent } from './busca-itens/item-tabela/item-tabela.component';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { FormBuscaItensComponent } from './busca-itens/form-busca-itens/form-busca-itens.component';
import { ContainerCestaComponent } from './modal-item/container-cesta/container-cesta.component';
import { LookupItensComponent } from './lookup-itens/lookup-itens.component';
import { ItensRoutingModule } from './services/itens-routing.module';



@NgModule({
  declarations: [
    BuscaItensComponent,
    ItemTabelaComponent,
    ModalItemComponent,
    FormBuscaItensComponent,
    ContainerCestaComponent,
    LookupItensComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ItensRoutingModule
  ],
  exports: [
    BuscaItensComponent,
    ItemTabelaComponent,
    ModalItemComponent,
    FormBuscaItensComponent,
    LookupItensComponent
  ]
})
export class ItensModule { }
