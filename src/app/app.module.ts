import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MenuPrincipalModule } from './menu-principal/menu-principal.module';
import { MaterialModule } from './core/material/material.module';
import { EntidadesModule } from './entidades/entidades.module';
import { ItensModule } from './itens/itens.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { LicitacaoModule } from './licitacao/licitacao.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,

        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        MaterialModule,
        MenuPrincipalModule,
        EntidadesModule,
        ItensModule,
        AutenticacaoModule,
        LicitacaoModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
