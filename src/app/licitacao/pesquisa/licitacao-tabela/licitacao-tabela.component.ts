import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { AtaLicitacaoSimplificada } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-licitacao-tabela',
  templateUrl: './licitacao-tabela.component.html',
  styleUrls: ['./licitacao-tabela.component.scss']
})
export class LicitacaoTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Output() pagina = new EventEmitter();

  @Input() listaDocumentos!: AtaLicitacaoSimplificada[];
  @Input() control!: FormControl;
  @Input() totalItems: number = 0;

  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;

  private selecionado!: AtaLicitacaoSimplificada;

  public displayedColumns: string[] = [ 'status', 'codigo', 'empresa', 'orgao', 'unidade', 'dataLicitacao', 'dataAta', 'valor'];

  constructor() { }

  clickGrid(valor: AtaLicitacaoSimplificada) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: AtaLicitacaoSimplificada): string {
    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }

  mudaPagina(paginador: PageEvent) {
    this.pagina.emit(paginador.pageIndex);
  }
}
