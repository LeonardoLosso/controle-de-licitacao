import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AtaLicitacaoSimplificada } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-licitacao-tabela',
  templateUrl: './licitacao-tabela.component.html',
  styleUrls: ['./licitacao-tabela.component.scss']
})
export class LicitacaoTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Input() listaDocumentos!: AtaLicitacaoSimplificada[];
  @Input() control!: FormControl;

  private selecionado!: AtaLicitacaoSimplificada;

  public isLoadingResults = false;
  public isRateLimitReached = false

  public displayedColumns: string[] = ['codigo', 'orgao', 'unidade', 'dataLicitacao', 'dataAta', 'status', 'valor'];

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
}
