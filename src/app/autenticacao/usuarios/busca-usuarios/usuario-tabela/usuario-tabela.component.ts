import { Component } from '@angular/core';

import { TabelaBaseDirective } from 'src/app/core/diretivas/tabela-base.directive';

@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: ['./usuario-tabela.component.scss']
})
export class UsuarioTabelaComponent extends TabelaBaseDirective {

  public displayedColumns: string[] = ['status', 'usuario', 'nome', 'email', 'telefone'];

  constructor() { super() }

  
}
