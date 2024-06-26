import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PesquisaComponent } from "../pesquisa/pesquisa.component";
import { AtaComponent } from "../ata/ata.component";
import { BaixaComponent } from "../baixa/baixa.component";



const routes: Routes = [
    {
        path: 'pesquisar',
        component: PesquisaComponent,
        data: { menuName: 'Pesquisar Licitações' }
    },
    {
        path: 'baixa',
        component: BaixaComponent,
        data: { menuName: 'Baixa' }
    },
    {
        path: '',
        component: AtaComponent,
        data: { menuName: 'Licitação' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicitacaoRoutingModule { }