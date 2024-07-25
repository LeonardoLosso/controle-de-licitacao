import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HeaderComponent } from "./header/header.component";
import { MaterialModule } from "../core/material/material.module";
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { BotoesComponent } from './botoes/botoes.component';
import { ContainerComponent } from './container/container.component';
import { CabecalhoBuscaNovoComponent } from './cabecalho-busca-novo/cabecalho-busca-novo.component';
import { BuscaContainerComponent } from './busca-container/busca-container.component';
import { SeparadorMilharPipe } from './pipes/separador-milhar.pipe';
import { MascarasInputPipe } from './pipes/mascaras-input.pipe';
import { FormataEnumPipe } from './pipes/formata-enum.pipe';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { PermissaoDirective } from "./directive/permissao.directive";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LookupBaseComponent } from './componentes/lookup-base/lookup-base.component';

@NgModule({
    declarations: [
        HeaderComponent,
        MenuLateralComponent,
        BotoesComponent,
        ContainerComponent,
        CabecalhoBuscaNovoComponent,
        BuscaContainerComponent,
        SeparadorMilharPipe,
        MascarasInputPipe,
        FormataEnumPipe,
        ModalConfirmacaoComponent,
        PermissaoDirective,
        LoadingSpinnerComponent,
        LookupBaseComponent
    ],
    imports: [
        CommonModule,

        MaterialModule,
        ReactiveFormsModule,
        RouterModule

    ],
    exports: [
        HeaderComponent,
        MenuLateralComponent,
        BotoesComponent,
        ContainerComponent,
        CabecalhoBuscaNovoComponent,
        BuscaContainerComponent,
        SeparadorMilharPipe,
        MascarasInputPipe,
        FormataEnumPipe,
        ModalConfirmacaoComponent,
        PermissaoDirective,
        LookupBaseComponent
    ]
})
export class SharedModule { }
