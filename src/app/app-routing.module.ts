import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'entidades',
    loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule)
  },
  {
    path: 'itens',
    loadChildren: () => import('./itens/itens.module').then(m => m.ItensModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path: 'licitacao',
    loadChildren: () => import('./licitacao/licitacao.module').then(m => m.LicitacaoModule)
  },
  {
    path: '',
    loadChildren: () => import('./menu-principal/menu-principal.module').then(m => m.MenuPrincipalModule)
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
