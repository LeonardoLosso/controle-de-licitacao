import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemSimplificado } from 'src/app/core/types/item';

@Component({
  selector: 'app-item-tabela',
  templateUrl: './item-tabela.component.html',
  styleUrls: ['./item-tabela.component.scss']
})
export class ItemTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Input() listaItens!: ItemSimplificado[];
  @Input() control!: FormControl;
  @Input() displayedColumns: string[] = ['codigo', 'status', 'cesta', 'nome', 'unidadePri', 'unidadeSec'];
  @Input() paginator: boolean = true;

  private selecionado!: ItemSimplificado;

  public isLoadingResults = false;
  public isRateLimitReached = false


  constructor() { }

  ngOnInit(): void {
  }

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
}
