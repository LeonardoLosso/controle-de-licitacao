import { Component } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

@Component({
  selector: 'app-licitacao-tabela',
  templateUrl: './licitacao-tabela.component.html',
  styleUrls: ['./licitacao-tabela.component.scss']
})
export class LicitacaoTabelaComponent extends TabelaBaseDirective{

  public displayedColumns: string[] = [ 'status', 'codigo', 'responsavel', 'empresa', 'orgao', 'unidade', 'dataLicitacao', 'dataAta', 'valor'];

  constructor() { super() }
}
