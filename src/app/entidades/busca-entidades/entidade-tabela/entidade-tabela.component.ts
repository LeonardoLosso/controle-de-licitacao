import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { EntidadeSimplificada } from 'src/app/core/types/entidade';


@Component({
    selector: 'app-entidade-tabela',
    templateUrl: './entidade-tabela.component.html',
    styleUrls: ['./entidade-tabela.component.scss']
})
export class EntidadeTabelaComponent {
    @Output() abrirDialog = new EventEmitter();
    @Output() pagina = new EventEmitter();

    @Input() listaEntidades!: EntidadeSimplificada[];
    @Input() control!: FormControl;
    @Input() paginator: boolean = true;
    @Input() displayedColumns: string[] = ['codigo', 'status', 'nome', 'tipo', 'telefone', 'email', 'cnpj'];
    @Input() totalItems: number = 0;
    @Input() isLoadingResults = false;
    @Input() isRateLimitReached = false;

    private selecionado!: EntidadeSimplificada;
    

    constructor() { }

    clickGrid(valor: EntidadeSimplificada) {
        this.selecionado = valor;
        this.control.setValue(valor);
    }

    selecionar(valor: EntidadeSimplificada): string {

        if (valor === this.selecionado) {
            return 'selecionado';
        }
        return '';
    }

    doubleClick() {
        this.abrirDialog.emit();
    }

    mudaPagina(paginador: PageEvent){
        this.pagina.emit(paginador.pageIndex);
    }
}
