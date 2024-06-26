import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaEntidadesComponent } from "../busca-entidades/busca-entidades.component";


const routes: Routes = [
    {
        path: '',
        component: BuscaEntidadesComponent,
        data: { menuName: 'Buscar Entidades' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntidadesRoutingModule { }