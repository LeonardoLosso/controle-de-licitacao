import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-baixa-policia',
  templateUrl: './cabecalho-baixa-policia.component.html',
  styleUrls: ['./cabecalho-baixa-policia.component.scss']
})
export class CabecalhoBaixaPoliciaComponent {
  @Input() status: number = 0;
  @Input() label: string = 'Empenho';

  @Output() acao = new EventEmitter();

  @Output() inativar = new EventEmitter();
  @Output() novo = new EventEmitter();
  @Output() remover = new EventEmitter();

  @Output() cancelar = new EventEmitter();
  @Output() editarEmpenho = new EventEmitter();

  @Output() adicionarNota = new EventEmitter();
  @Output() excluirNota = new EventEmitter();
  @Output() editarNota = new EventEmitter();

  editar() {
    this.editarEmpenho.emit();
  }

  salvarDocumento() {
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
  adicionarNotas() {
    this.adicionarNota.emit();
  }
  removerNotas() {
    this.excluirNota.emit();
  }

  editarNotas() {
    this.editarNota.emit();
  }
  verificaStatus(): boolean {
    return this.status === 0 || this.status === 1 || !this.status;
  }
}
