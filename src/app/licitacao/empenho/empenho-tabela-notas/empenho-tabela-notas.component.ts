import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotaSimplificada } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-empenho-tabela-notas',
  templateUrl: './empenho-tabela-notas.component.html',
  styleUrls: ['./empenho-tabela-notas.component.scss']
})
export class EmpenhoTabelaNotasComponent {

  @Output() abrirDialog = new EventEmitter();
  @Input() listaDocumentos!: NotaSimplificada[];
  @Input() control!: FormControl;

  private selecionado!: NotaSimplificada;

  public displayedColumns: string[] = [
    'codigo', 'empenho', 'unidade',
    'dataEmissao', 'dataEntrega', 'valorEntregue'
  ];

  clickGrid(valor: NotaSimplificada) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: NotaSimplificada): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }

  public getTotal() {
    if (this.listaDocumentos && this.listaDocumentos.length > 0) {
      return this.listaDocumentos.map(t => t.valorEntregue).reduce((acc, value) => acc + value, 0);
    }
    else return 0;
  }
}
