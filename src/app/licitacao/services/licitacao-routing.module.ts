import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PesquisaComponent } from "../pesquisa/pesquisa.component";
import { AtaComponent } from "../ata/ata.component";
import { BaixaComponent } from "../baixa/baixa.component";
import { authGuard, permGuard } from "src/app/autenticacao/auth.guard";
import { EmpenhoComponent } from "../empenho/empenho.component";
import { BaixaPoliciaComponent } from "../baixa-policia/baixa-policia.component";



const routes: Routes = [
    {
        path: 'pesquisar',
        component: PesquisaComponent,
        data: {
            menuName: 'Pesquisar Licitações',
            recursoId: 301
        },
        canActivate: [authGuard, permGuard]
    },
    {
        path: 'baixa',
        component: BaixaComponent,
        data: {
            menuName: 'Baixa',
            recursoId: 401
        },
        canActivate: [authGuard, permGuard]
    },
    {
        path: 'baixa/policia',
        component: BaixaPoliciaComponent,
        data: {
            menuName: 'Baixa',
            recursoId: 401
        },
        canActivate: [authGuard, permGuard]
    },
    {
        path: 'empenho',
        component: EmpenhoComponent,
        data: {
            menuName: 'Empenho',
            recursoId: 407
        },
        canActivate: [authGuard, permGuard]
    },
    {
        path: '',
        component: AtaComponent,
        data: {
            menuName: 'Licitação',
            recursoId: 301
        },
        canActivate: [authGuard, permGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicitacaoRoutingModule { }