import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ItemDeBaixa } from 'src/app/core/types/item';

@Component({
  selector: 'app-baixa-tabela',
  templateUrl: './baixa-tabela.component.html',
  styleUrls: ['./baixa-tabela.component.scss']
})
export class BaixaTabelaComponent {
  @Output() abrirDialog = new EventEmitter();

  @Input() listaItens!: ItemDeBaixa[];
  @Input() control!: FormControl;
  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;
  @Input() totalizadores = true;
  @Input() displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'qtdeLicitada', 'qtdeEmpenhada', 'qtdeAEmpenhar',
    'valorEmpenhado', 'valorLicitado', 'saldo', 'valorUnitario'
  ];

  private selecionado!: ItemDeBaixa;

  constructor() { }

  ngOnInit(): void {

  }

  public getTotalEmpenhado() {
    if (this.listaItens)
      return this.listaItens.map(t => t.valorEmpenhado).reduce((acc, value) => acc + value, 0);
    else return '';
  }

  public getTotalLicitado() {
    if (this.listaItens)
      return this.listaItens.map(t => t.valorLicitado).reduce((acc, value) => acc + value, 0);
    else return '';
  }

  public getTotalSaldo() {
    if (this.listaItens)
      return this.listaItens.map(t => t.saldo).reduce((acc, value) => acc + value, 0);
    else return '';
  }

  public clickGrid(valor: ItemDeBaixa) {
    if (this.control) {
      this.selecionado = valor;
      this.control.setValue(valor);
    }
  }

  public selecionar(valor: ItemDeBaixa): string {

    if (valor === this.selecionado && this.control) {
      return 'selecionado';
    }
    return '';
  }

  public doubleClick() {
    if (this.control) {
      this.abrirDialog.emit();
    }
  }
}
