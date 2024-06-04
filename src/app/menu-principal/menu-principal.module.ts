import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MenuPrincipalComponent } from "./menu-principal.component";
import { MaterialModule } from "../core/material/material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        MenuPrincipalComponent
    ],
    imports: [
        CommonModule,

        MaterialModule,
        SharedModule

    ],
    exports: [
        MenuPrincipalComponent
    ]
})
export class MenuPrincipalModule { }