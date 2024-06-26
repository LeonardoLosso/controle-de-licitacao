import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaUsuariosComponent } from "../usuarios/busca-usuarios/busca-usuarios.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
    {
        path: 'usuarios',
        component: BuscaUsuariosComponent,
        data: {menuName: 'Buscar Usuarios'}
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {menuName: 'Login'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }