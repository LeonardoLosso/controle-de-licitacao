import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "src/app/autenticacao/auth.guard";
import { MenuPrincipalComponent } from "../menu-principal.component";



const routes: Routes = [
    {
        path: '',
        component: MenuPrincipalComponent,
        data: { menuName: 'Menu Principal' },
        canActivate: [authGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }