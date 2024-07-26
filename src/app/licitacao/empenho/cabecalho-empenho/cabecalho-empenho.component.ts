import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-empenho',
  templateUrl: './cabecalho-empenho.component.html',
  styleUrls: ['./cabecalho-empenho.component.scss']
})
export class CabecalhoEmpenhoComponent {
  @Input() status: number = 0;
  @Input() label: string = 'Item';

  @Output() acao = new EventEmitter();
  @Output() inativar = new EventEmitter();
  @Output() cancelar = new EventEmitter();

  @Output() adicionar = new EventEmitter();
  @Output() excluir = new EventEmitter();
  @Output() editar = new EventEmitter();

  @Output() adicionarNota = new EventEmitter();
  @Output() excluirNota = new EventEmitter();
  @Output() editarNota = new EventEmitter();

  cancelarOperacao() {
    this.cancelar.emit();
  }

  salvar() {
    this.acao.emit();
  }

  inativarDocumento() {
    this.inativar.emit();
  }

  adicionarItem() {
    this.adicionar.emit();
  }
  removerItem() {
    this.excluir.emit();
  }

  editarItem() {
    this.editar.emit();
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
