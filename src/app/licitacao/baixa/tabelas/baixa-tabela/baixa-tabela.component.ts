import { Component, Input } from '@angular/core';

import { ItemDeBaixa } from 'src/app/core/types/item';

@Component({
  selector: 'app-baixa-tabela',
  templateUrl: './baixa-tabela.component.html',
  styleUrls: ['./baixa-tabela.component.scss']
})
export class BaixaTabelaComponent {
  @Input() listaItens!: ItemDeBaixa[];
  public displayedColumns: string[] = [
    'codigo', 'nome', 'unidade', 
    'qtdeEmpenhada', 'qtdeLicitada', 'qtdeAEmpenhar', 
    'valorEmpenhado', 'valorLicitado', 'saldo', 'valorUnitario'
  ];

  constructor() { }

  ngOnInit(): void {

  }

  public getTotalEmpenhado() {
    return this.listaItens.map(t => t.valorEmpenhado).reduce((acc, value) => acc + value, 0);
  }

  public getTotalLicitado() {
    return this.listaItens.map(t => t.valorLicitado).reduce((acc, value) => acc + value, 0);
  }

  public getTotalSaldo() {
    return this.listaItens.map(t => t.saldo).reduce((acc, value) => acc + value, 0);
  }  
}
