import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { BuscaEntidadesComponent } from './entidades/busca-entidades/busca-entidades.component';
import { BuscaItensComponent } from './itens/busca-itens/busca-itens.component';
import { BuscaUsuariosComponent } from './autenticacao/usuarios/busca-usuarios/busca-usuarios.component';
import { AtaComponent } from './licitacao/ata/ata.component';
import { PesquisaComponent } from './licitacao/pesquisa/pesquisa.component';
import { BaixaComponent } from './licitacao/baixa/baixa.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent,
    data: {menuName: 'Menu Principal'}
  },
  {
    path: 'entidades',
    component: BuscaEntidadesComponent,
    data: {menuName: 'Buscar Entidades'}
  },
  {
    path: 'itens',
    component: BuscaItensComponent,
    data: {menuName: 'Buscar Itens'}
  },
  {
    path: 'usuarios',
    component: BuscaUsuariosComponent,
    data: {menuName: 'Buscar Usuarios'}
  },
  {
    path: 'licitacao/pesquisar',
    component: PesquisaComponent,
    data: {menuName: 'Pesquisar Licitações'}
  },
  {
    path: 'licitacao',
    component: AtaComponent,
    data: {menuName: 'Licitação'}
  },
  {
    path: 'licitacao/baixa',
    component: BaixaComponent,
    data: {menuName: 'Baixa'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
