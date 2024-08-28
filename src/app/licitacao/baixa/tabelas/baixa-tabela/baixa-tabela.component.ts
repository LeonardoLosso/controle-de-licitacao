import { Component, Input } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';
import { ItemDeBaixa } from 'src/app/core/types/item';

@Component({
  selector: 'app-baixa-tabela',
  templateUrl: './baixa-tabela.component.html',
  styleUrls: ['./baixa-tabela.component.scss']
})
export class BaixaTabelaComponent extends TabelaBaseDirective {

  @Input() override lista!: ItemDeBaixa[];
  @Input() totalizadores = true;
  @Input() displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'qtdeLicitada', 'qtdeEmpenhada', 'qtdeAEmpenhar',
    'valorEmpenhado', 'valorLicitado', 'saldo', 'valorUnitario'
  ];


  constructor() { super() }

  public getTotalEmpenhado() {
    if (this.lista)
      return this.lista.map(t => t.valorEmpenhado).reduce((acc, value) => acc + value, 0);
    else return '';
  }

  public getTotalLicitado() {
    if (this.lista)
      return this.lista.map(t => t.valorLicitado).reduce((acc, value) => acc + value, 0);
    else return '';
  }

  public getTotalSaldo() {
    if (this.lista)
      return this.lista.map(t => t.saldo).reduce((acc, value) => acc + value, 0);
    else return '';
  }

}
