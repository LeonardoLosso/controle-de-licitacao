import { Component, Input } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

@Component({
  selector: 'app-item-tabela',
  templateUrl: './item-tabela.component.html',
  styleUrls: ['./item-tabela.component.scss']
})
export class ItemTabelaComponent extends TabelaBaseDirective {

  @Input() displayedColumns: string[] = ['status', 'codigo', 'nome', 'unidadePri', 'unidadeSec'];

  constructor() { super() }
}
