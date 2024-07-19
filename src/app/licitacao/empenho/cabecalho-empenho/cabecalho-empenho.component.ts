import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-empenho',
  templateUrl: './cabecalho-empenho.component.html',
  styleUrls: ['./cabecalho-empenho.component.scss']
})
export class CabecalhoEmpenhoComponent {
  @Input() status: number = 0;

  @Output() acao = new EventEmitter();
  @Output() inativar = new EventEmitter();
  @Output() cancelar = new EventEmitter();

  @Output() adicionar = new EventEmitter();
  @Output() excluir = new EventEmitter();
  @Output() editar = new EventEmitter();

  cancelarOperacao() {
    this.cancelar.emit();
  }

  salvar() {
    this.acao.emit();
  }

  adicionarItem() {
    this.adicionar.emit();
  }

  inativarDocumento() {
    this.inativar.emit();
  }
  removerItem() {
    this.excluir.emit();
  }

  editarItem() {
    this.editar.emit();
  }
  verificaStatus(): boolean {
    return this.status === 0 || this.status === 1 || !this.status;
  }
}
