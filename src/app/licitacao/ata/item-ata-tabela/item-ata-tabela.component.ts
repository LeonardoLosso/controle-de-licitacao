import { Component, Input } from '@angular/core';
import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

import { ItemDeAta } from 'src/app/core/types/item';

@Component({
  selector: 'app-item-ata-tabela',
  templateUrl: './item-ata-tabela.component.html',
  styleUrls: ['./item-ata-tabela.component.scss']
})
export class ItemAtaTabelaComponent extends TabelaBaseDirective {
  @Input() override lista!: ItemDeAta[];
  @Input() reajuste!: boolean;

  public displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal'];

  constructor() { super() }


  public override clickGrid(valor: ItemDeAta) {
    if (!this.reajuste) {
      super.clickGrid(valor);
    }
  }

  public override selecionar(valor: ItemDeAta): string {

    if (!this.reajuste) {
      return super.selecionar(valor);
    }
    return '';
  }

  public getTotalItems() {
    return this.lista.length;
  }

  public getTotalCost() {
    return this.lista.map(t => t.valorLicitado).reduce((acc, value) => acc + value, 0);
  }

  public override doubleClick() {
    if (!this.reajuste)
      super.doubleClick();
  }
}
