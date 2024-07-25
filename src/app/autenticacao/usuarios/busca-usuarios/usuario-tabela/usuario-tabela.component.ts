import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { UsuarioSimplificado } from 'src/app/core/types/usuarios';

@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: ['./usuario-tabela.component.scss']
})
export class UsuarioTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Output() pagina = new EventEmitter();

  @Input() listaUsuarios!: UsuarioSimplificado[];
  @Input() control!: FormControl;
  @Input() totalItems: number = 0;
  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;

  private selecionado!: UsuarioSimplificado;

  public displayedColumns: string[] = ['status', 'codigo', 'nome', 'usuario', 'cpf'];

  constructor() { }

  clickGrid(valor: UsuarioSimplificado) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: UsuarioSimplificado): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }

  mudaPagina(paginador: PageEvent) {
    this.pagina.emit(paginador.pageIndex);
  }
}
