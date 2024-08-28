import { Component } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

@Component({
  selector: 'app-empenho-tabela',
  templateUrl: './empenho-tabela.component.html',
  styleUrls: ['./empenho-tabela.component.scss']
})
export class EmpenhoTabelaComponent extends TabelaBaseDirective{


  public displayedColumns: string[] = [
    'status', 'codigo', 'numEmpenho', 'edital', 'data', 'orgao', 'unidade', 'saldo', 'valor'
  ];
}
