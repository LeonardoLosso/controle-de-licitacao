import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ItemDeEmpenho } from 'src/app/core/types/item';

@Component({
  selector: 'app-empenho-tabela-itens',
  templateUrl: './empenho-tabela-itens.component.html',
  styleUrls: ['./empenho-tabela-itens.component.scss']
})
export class EmpenhoTabelaItensComponent implements OnInit {

  @Output() abrirDialog = new EventEmitter();
  @Input() listaItens!: ItemDeEmpenho[];
  @Input() control!: FormControl;
  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;
  @Input() policia = false;

  private selecionado!: ItemDeEmpenho;
  public displayedColumns: string[] = [
    'codigo', 'nome', 'unidade',
    'qtdeEmpenhada', 'valorUnitario', 'qtdeEntregue',
    'qtdeAEntregar', 'valorEntregue', 'total'
  ];
  
  ngOnInit(): void {
    if(this.policia)
      this.displayedColumns = ['codigo', 'nome', 'unidade'];
  }

  clickGrid(valor: ItemDeEmpenho) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: ItemDeEmpenho): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }


  public getSaldo() {
    if (this.listaItens && this.listaItens.length > 0){
      return this.getTotal() - this.getTotalEntregue();
    }
    else return 0;
  }

  public getTotalEntregue() {
    if (this.listaItens && this.listaItens.length > 0) {
      return this.listaItens.map(t => t.valorEntregue).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }

  public getTotal() {
    if (this.listaItens && this.listaItens.length > 0) {
      return this.listaItens.map(t => t.total).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }
}
