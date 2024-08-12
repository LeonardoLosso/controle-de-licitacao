import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-baixa',
  templateUrl: './cabecalho-baixa.component.html',
  styleUrls: ['./cabecalho-baixa.component.scss']
})
export class CabecalhoBaixaComponent {
  @Input() status: number = 0;

  @Output() acao = new EventEmitter();

  @Output() inativar = new EventEmitter();
  @Output() novo = new EventEmitter();
  @Output() remover = new EventEmitter();

  @Output() cancelar = new EventEmitter();
  @Output() editarEmpenho = new EventEmitter();

  editar() {
    this.editarEmpenho.emit();
  }

  importar() {
    this.acao.emit();
  }

  inativarDocumento() {
    this.inativar.emit();
  }

  adicionar() {
    this.novo.emit();
  }

  cancelarOperacao() {
    this.cancelar.emit();
  }

  excluir() {
    this.remover.emit();
  }

  verificaStatus(): boolean {
    return this.status === 0 || this.status === 1 || !this.status;
  }
}
