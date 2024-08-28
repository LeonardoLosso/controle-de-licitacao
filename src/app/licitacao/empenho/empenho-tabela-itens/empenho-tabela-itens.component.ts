import { Component, Input, OnInit} from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';
import { ItemDeEmpenho } from 'src/app/core/types/item';

@Component({
  selector: 'app-empenho-tabela-itens',
  templateUrl: './empenho-tabela-itens.component.html',
  styleUrls: ['./empenho-tabela-itens.component.scss']
})
export class EmpenhoTabelaItensComponent extends TabelaBaseDirective{

  @Input() override lista!: ItemDeEmpenho[];
  @Input() policia = false;

  public displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'qtdeEmpenhada', 'valorUnitario', 'qtdeEntregue',
    'qtdeAEntregar', 'valorEntregue', 'total'
  ];
  constructor(){super()}
  
  protected override onInit(): void {
    if(this.policia)
      this.displayedColumns = ['codigo', 'nome', 'unidade'];
  }

  public getSaldo() {
    if (this.lista && this.lista.length > 0){
      return this.getTotal() - this.getTotalEntregue();
    }
    else return 0;
  }

  public getTotalEntregue() {
    if (this.lista && this.lista.length > 0) {
      return this.lista.map(t => t.valorEntregue).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }

  public getTotal() {
    if (this.lista && this.lista.length > 0) {
      return this.lista.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }
}
