import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cabecalho-busca-novo',
    templateUrl: './cabecalho-busca-novo.component.html',
    styleUrls: ['./cabecalho-busca-novo.component.scss']
})
export class CabecalhoBuscaNovoComponent {
    @Input() status: number = 1;

    @Input() permissaoInativar: number = 0;
    @Input() permissaoNovo: number = 0;
    @Input() permissaoEditar: number = 0;
    
    @Output() realizarBusca = new EventEmitter();
    @Output() limparFiltros = new EventEmitter();

    @Output() inativarCadastro = new EventEmitter();
    @Output() novoCadastro = new EventEmitter();
    @Output() editarCadastro = new EventEmitter();
    @Output() cancelarOperacao = new EventEmitter();

    limpar() {
        this.limparFiltros.emit();
    }

    buscar() {
        this.realizarBusca.emit();
    }

    inativar() {
        this.inativarCadastro.emit();
    }

    novo() {
        this.novoCadastro.emit();
    }

    cancelar() {
        this.cancelarOperacao.emit();
    }

    editar() {
        this.editarCadastro.emit();
    }
    onEnterPress(event: any): void {
        event.preventDefault(); 
        event.stopPropagation(); 
        this.buscar(); 
    }
}
