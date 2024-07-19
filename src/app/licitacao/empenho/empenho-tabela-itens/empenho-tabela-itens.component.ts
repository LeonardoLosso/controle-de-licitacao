import { Component, Input } from '@angular/core';

import { ItemDeEmpenho } from 'src/app/core/types/item';

@Component({
  selector: 'app-empenho-tabela-itens',
  templateUrl: './empenho-tabela-itens.component.html',
  styleUrls: ['./empenho-tabela-itens.component.scss']
})
export class EmpenhoTabelaItensComponent {
  @Input() listaItens!: ItemDeEmpenho[];
  private totalEntregue!: number;
  private total!: number;

  public displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'qtdeEmpenhada', 'valorUnitario', 'qtdeEmpenhada',
    'qtdeEntregue', 'qtdeAEntregar', 'valorEntregue', 'total'
  ];

  public getSaldo() {
    if (this.listaItens)
      return this.total - this.totalEntregue;
    else return '';
  }

  public getTotalEntregue() {
    if (this.listaItens){
      this.totalEntregue = this.listaItens.map(t => t.valorEntregue).reduce((acc, value) => acc + value, 0);
      return this.totalEntregue;
    }
    else return '';
  }

  public getTotal() {
    if (this.listaItens){
      this.total = this.listaItens.map(t => t.total).reduce((acc, value) => acc + value, 0);
      return this.total;
    }
    else return '';
  }
}
