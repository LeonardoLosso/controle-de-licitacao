import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaEntidadesComponent } from "../busca-entidades/busca-entidades.component";
import { authGuard, permGuard } from "src/app/autenticacao/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: BuscaEntidadesComponent,
        data: { 
            menuName: 'Buscar Entidades',
            recursoId: 101
        },
        canActivate: [authGuard, permGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntidadesRoutingModule { }