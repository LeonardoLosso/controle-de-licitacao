import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ItemDeNota } from 'src/app/core/types/item';

@Component({
  selector: 'app-item-nota-tabela',
  templateUrl: './item-nota-tabela.component.html',
  styleUrls: ['./item-nota-tabela.component.scss']
})
export class ItemNotaTabelaComponent implements OnInit {

  @Output() abrirDialog = new EventEmitter();
  @Input() listaItens!: ItemDeNota[];
  @Input() control!: FormControl;
  @Input() ehPolicia: boolean = false;

  private selecionado!: ItemDeNota;

  public displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'quantidade', 'valorUnitario', 'valorTotal'
  ];
  ngOnInit(): void {
    if (this.ehPolicia)
      this.displayedColumns = [
        'codigo', 'nome', 'unidade',
        'qtdeCaixa', 'quantidade', 'valorCaixa',
        'valorUnitario', 'valorTotal']
  }
  clickGrid(valor: ItemDeNota) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: ItemDeNota): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }

  public getTotal() {
    if (this.listaItens && this.listaItens.length > 0) {
      return this.listaItens.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }

  public calculaTotal(row: ItemDeNota) {
    row.valorTotal = row.valorUnitario * (row.quantidade ?? 0);
  }

  public calculaUnitario(row: ItemDeNota) {
    row.valorUnitario = (row.valorCaixa ?? 0) / (row.qtdeCaixa ?? 0);
  }
}
