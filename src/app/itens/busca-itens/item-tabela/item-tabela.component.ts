import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { ItemSimplificado } from 'src/app/core/types/item';

@Component({
  selector: 'app-item-tabela',
  templateUrl: './item-tabela.component.html',
  styleUrls: ['./item-tabela.component.scss']
})
export class ItemTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Output() pagina = new EventEmitter();

  @Input() listaItens!: ItemSimplificado[];
  @Input() control!: FormControl;
  @Input() paginator: boolean = true;
  @Input() totalItems: number = 0;
  @Input() displayedColumns: string[] = ['codigo', 'nome', 'status', 'cesta', 'unidadePri', 'unidadeSec'];
  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;

  private selecionado!: ItemSimplificado;


  constructor() { }

  clickGrid(valor: ItemSimplificado) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: ItemSimplificado): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }
  
  mudaPagina(paginador: PageEvent){
    this.pagina.emit(paginador.pageIndex);
}
}
