import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BuscaUsuariosComponent } from './usuarios/busca-usuarios/busca-usuarios.component';
import { ModalUsuariosComponent } from './usuarios/modal-usuarios/modal-usuarios.component';
import { UsuarioTabelaComponent } from './usuarios/busca-usuarios/usuario-tabela/usuario-tabela.component';
import { FormBuscaUsuariosComponent } from './usuarios/busca-usuarios/form-busca-usuarios/form-busca-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../core/material/material.module';
import { ContainerPermissoesComponent } from './usuarios/modal-usuarios/container-permissoes/container-permissoes.component';

@NgModule({
  declarations: [
    BuscaUsuariosComponent,
    ModalUsuariosComponent,
    UsuarioTabelaComponent,
    FormBuscaUsuariosComponent,
    ContainerPermissoesComponent
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
    BuscaUsuariosComponent,
    ModalUsuariosComponent,
    UsuarioTabelaComponent,
    FormBuscaUsuariosComponent
  ]
})
export class AutenticacaoModule { }
