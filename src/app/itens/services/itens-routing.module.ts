import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuscaItensComponent } from "../busca-itens/busca-itens.component";



const routes: Routes = [
    {
        path: '',
        component: BuscaItensComponent,
        data: { menuName: 'Buscar Itens' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItensRoutingModule { }