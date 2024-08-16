import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ItemDeAta } from 'src/app/core/types/item';

@Component({
  selector: 'app-item-ata-tabela',
  templateUrl: './item-ata-tabela.component.html',
  styleUrls: ['./item-ata-tabela.component.scss']
})
export class ItemAtaTabelaComponent implements OnInit {
  @Input() listaItens!: ItemDeAta[];
  @Input() control!: FormControl;
  @Input() reajuste!: boolean;
  @Output() editarItem = new EventEmitter();

  private selecionado!: ItemDeAta;

  public displayedColumns: string[] = ['codigo', 'nome', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal'];

  constructor() { }

  ngOnInit(): void {

  }

  public clickGrid(valor: ItemDeAta) {
    if (!this.reajuste) {
      this.selecionado = valor;
      this.control.setValue(valor);
    }
  }

  public selecionar(valor: ItemDeAta): string {

    if (valor === this.selecionado && !this.reajuste) {
      return 'selecionado';
    }
    return '';
  }

  public getTotalItems() {
    return this.listaItens.length;
  }

  public getTotalCost() {
    return this.listaItens.map(t => t.valorLicitado).reduce((acc, value) => acc + value, 0);
  }

  public doubleClick() {
    if (!this.reajuste)
      this.editarItem.emit();
  }
}
