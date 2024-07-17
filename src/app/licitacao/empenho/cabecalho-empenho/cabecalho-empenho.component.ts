import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-empenho',
  templateUrl: './cabecalho-empenho.component.html',
  styleUrls: ['./cabecalho-empenho.component.scss']
})
export class CabecalhoEmpenhoComponent {
  @Input() status: number = 0;

  @Output() acao = new EventEmitter();

  @Output() cancelar = new EventEmitter();


  cancelarOperacao() {
    this.cancelar.emit();
  }

  salvar() {
    this.acao.emit();
  }

  adicionarItem() {

  }

  inativarDocumento() {

  }
  removerItem() {

  }

  editarItem() {

  }
  verificaStatus(): boolean {
    return this.status === 0 || this.status === 1 || !this.status;
  }
}
