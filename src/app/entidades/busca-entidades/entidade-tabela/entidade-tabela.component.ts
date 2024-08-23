import { Component, Input } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

@Component({
    selector: 'app-entidade-tabela',
    templateUrl: './entidade-tabela.component.html',
    styleUrls: ['./entidade-tabela.component.scss']
})
export class EntidadeTabelaComponent extends TabelaBaseDirective {

    @Input() displayedColumns: string[] = ['status', 'codigo', 'nome', 'tipo', 'telefone', 'email', 'cnpj'];

    constructor() { super() }
}
