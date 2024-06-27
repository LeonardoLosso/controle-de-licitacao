import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaItensComponent } from "../busca-itens/busca-itens.component";
import { authGuard, permGuard } from "src/app/autenticacao/auth.guard";



const routes: Routes = [
    {
        path: '',
        component: BuscaItensComponent,
        data: { 
            menuName: 'Buscar Itens',
            recursoId: 201
         },
        canActivate: [authGuard, permGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItensRoutingModule { }