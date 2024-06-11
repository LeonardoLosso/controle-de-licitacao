import { Component, Input } from '@angular/core';
import { ItemDeBaixa } from 'src/app/core/types/item';

@Component({
  selector: 'app-baixa-tabela',
  templateUrl: './baixa-tabela.component.html',
  styleUrls: ['./baixa-tabela.component.scss']
})
export class BaixaTabelaComponent {
  @Input() listaItens!: ItemDeBaixa[];
  public displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal'];

  constructor() { }

  ngOnInit(): void {

  }
  
  public getTotalCost() {
    return this.listaItens.map(t => t.ValorTotal).reduce((acc, value) => acc + value, 0);
  }
}
