import { Component, Input } from '@angular/core';
import { ItemDeReajuste } from 'src/app/core/types/item';

@Component({
  selector: 'app-tabela-historico-reajuste',
  templateUrl: './tabela-historico-reajuste.component.html',
  styleUrls: ['./tabela-historico-reajuste.component.scss']
})
export class TabelaHistoricoReajusteComponent {
  @Input() listaItens!: ItemDeReajuste[];
  // @Input() control!: FormControl;
  // @Output() editarItem = new EventEmitter();

  
  public displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal'];


  public getTotalItems(){
    return this.listaItens.length;
  }

  public getTotalCost() {
    return this.listaItens.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);
  }
}
