import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cabecalho-busca-novo',
    templateUrl: './cabecalho-busca-novo.component.html',
    styleUrls: ['./cabecalho-busca-novo.component.scss']
})
export class CabecalhoBuscaNovoComponent {
    @Input() comBotoes: boolean = true
    @Input() status: number = 1;
    
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
        console.log(this.status)
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
}
