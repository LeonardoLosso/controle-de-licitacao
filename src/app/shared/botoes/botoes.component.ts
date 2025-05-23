import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botoes',
  templateUrl: './botoes.component.html',
  styleUrls: ['./botoes.component.scss']
})
export class BotoesComponent {
  @Input() icone!: string;
  @Input() texto!: string;
  @Input() path!: string;
  @Input() color: string = 'primary'
  @Input() variant: 'btn-principal' | 'btn-cabecalho' = 'btn-principal'
  @Input() permissao!: number;
  @Input() botaoDesabilitado = false;

  @Output() acao = new EventEmitter();

  doClick() {
    this.acao.emit();
  }

  onHasPermission(hasPermission: boolean) {
    if (!this.botaoDesabilitado) {
      setTimeout(() => {
        this.botaoDesabilitado = !hasPermission;
      }, 0);
    }
  }
}
