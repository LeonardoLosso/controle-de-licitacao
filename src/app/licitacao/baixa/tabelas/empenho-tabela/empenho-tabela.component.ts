import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EmpenhoSimplificado } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-empenho-tabela',
  templateUrl: './empenho-tabela.component.html',
  styleUrls: ['./empenho-tabela.component.scss']
})
export class EmpenhoTabelaComponent {
  @Input() listaEmpenhos!: EmpenhoSimplificado[];
  @Input() control!: FormControl;
  @Output() editar = new EventEmitter();

  private selecionado!: EmpenhoSimplificado;


  public displayedColumns: string[] = [
    'codigo', 'edital', 'data', 'orgao', 'unidade', 'status', 'saldo', 'valor'
  ];

  clickGrid(valor: EmpenhoSimplificado) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: EmpenhoSimplificado): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.editar.emit();
  }
}
