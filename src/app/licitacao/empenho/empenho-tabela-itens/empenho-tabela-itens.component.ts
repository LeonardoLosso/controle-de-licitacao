import { Component, Input } from '@angular/core';

import { ItemDeEmpenho } from 'src/app/core/types/item';

@Component({
  selector: 'app-empenho-tabela-itens',
  templateUrl: './empenho-tabela-itens.component.html',
  styleUrls: ['./empenho-tabela-itens.component.scss']
})
export class EmpenhoTabelaItensComponent {
  @Input() listaItens!: ItemDeEmpenho[];

}
