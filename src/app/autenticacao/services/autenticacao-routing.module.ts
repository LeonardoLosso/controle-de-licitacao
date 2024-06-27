import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaUsuariosComponent } from "../usuarios/busca-usuarios/busca-usuarios.component";
import { LoginComponent } from "../login/login.component";
import { authGuard, loginGuard, permGuard } from "../auth.guard";

const routes: Routes = [
    {
        path: 'usuarios',
        component: BuscaUsuariosComponent,
        data: {
            menuName: 'Buscar Usuarios',
            recursoId: 601
        },
        canActivate: [authGuard, permGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }