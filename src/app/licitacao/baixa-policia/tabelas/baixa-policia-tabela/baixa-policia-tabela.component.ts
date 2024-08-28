import { Component, Input } from '@angular/core';
import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';
import { EmpenhoPolicia } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-baixa-policia-tabela',
  templateUrl: './baixa-policia-tabela.component.html',
  styleUrls: ['./baixa-policia-tabela.component.scss']
})
export class BaixaPoliciaTabelaComponent extends TabelaBaseDirective{
  @Input() override lista!: EmpenhoPolicia[];


  public displayedColumns: string[] = ['numEmpenho', 'numNota', 'data', 'valor'];

  public getTotal() {
    if (this.lista)
      return this.lista.map(t => t.valor).reduce((acc, value) => acc + value, 0);
    else return '';
  }
}
