import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmpenhoPolicia } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-baixa-policia-tabela',
  templateUrl: './baixa-policia-tabela.component.html',
  styleUrls: ['./baixa-policia-tabela.component.scss']
})
export class BaixaPoliciaTabelaComponent {
  @Input() listaEmpenhos!: EmpenhoPolicia[];
  @Input() control!: FormControl;
  @Output() editar = new EventEmitter();

  private selecionado!: EmpenhoPolicia;

  public displayedColumns: string[] = ['numEmpenho', 'numNota', 'data', 'valor'];

  clickGrid(valor: EmpenhoPolicia) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: EmpenhoPolicia): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.editar.emit();
  }

  public getTotal() {
    if (this.listaEmpenhos)
      return this.listaEmpenhos.map(t => t.valor).reduce((acc, value) => acc + value, 0);
    else return '';
  }
}
