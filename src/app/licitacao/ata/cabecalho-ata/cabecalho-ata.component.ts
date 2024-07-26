import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-ata',
  templateUrl: './cabecalho-ata.component.html',
  styleUrls: ['./cabecalho-ata.component.scss']
})
export class CabecalhoAtaComponent {
  @Input() status: number = 0;
  @Input() permissao: number = 302;
  @Input() possuiEmpenho: boolean = false;
  
  @Output() acao = new EventEmitter();
  
  @Output() inativar = new EventEmitter();
  @Output() novo = new EventEmitter();
  @Output() remover = new EventEmitter();
  
  @Output() cancelar = new EventEmitter();
  @Output() salvar = new EventEmitter();

  salvarDocumento() {
    this.salvar.emit();
  }

  abrirBaixa() {
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

  verificaStatus(): boolean{
    return this.status === 0 || this.status === 1 || !this.status;
  }
}
