import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Reajuste } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent {

  private selectedTabIndex: number = 0;
  @Input() reajustes!: Reajuste[];
  @Output() criar = new EventEmitter();
  @Output() excluir = new EventEmitter();

  constructor() { }

  public gerarHistorico() {
    this.criar.emit();
  }

  public excluirHistorico() {
    this.excluir.emit(this.selectedTabIndex);
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }
}
