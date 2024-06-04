import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { BuscaEntidadesComponent } from './entidades/busca-entidades/busca-entidades.component';
import { BuscaItensComponent } from './itens/busca-itens/busca-itens.component';
import { BuscaUsuariosComponent } from './autenticacao/usuarios/busca-usuarios/busca-usuarios.component';
import { PesquisaComponent } from './pesquisa/pesquisa/pesquisa.component';
import { AtaComponent } from './licitacao/ata/ata.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent
  },
  {
    path: 'entidades',
    component: BuscaEntidadesComponent
  },
  {
    path: 'itens',
    component: BuscaItensComponent
  },
  {
    path: 'usuarios',
    component: BuscaUsuariosComponent
  },
  {
    path: 'pesquisar',
    component: PesquisaComponent
  },
  {
    path: 'licitacao',
    component: AtaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
