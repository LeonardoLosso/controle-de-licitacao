import { Component, Input } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';
import { NotaSimplificada } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-empenho-tabela-notas',
  templateUrl: './empenho-tabela-notas.component.html',
  styleUrls: ['./empenho-tabela-notas.component.scss']
})
export class EmpenhoTabelaNotasComponent extends TabelaBaseDirective{

  @Input() override lista!: NotaSimplificada[];

constructor (){super()}
  public displayedColumns: string[] = [
    'codigo', 'numNota', 'unidade',
    'dataEmissao', 'dataEntrega', 'valorEntregue'
  ];

  public getTotal() {
    if (this.lista && this.lista.length > 0) {
      return this.lista.map(t => t.valorEntregue).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }
}
