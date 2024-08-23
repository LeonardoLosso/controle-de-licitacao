import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Directive({})
export abstract class TabelaBaseDirective {

  @Output() abrirDialog = new EventEmitter();
  @Output() pagina = new EventEmitter();

  @Input() lista!: any;
  @Input() control!: FormControl;
  @Input() totalItems: number = 0;
  @Input() paginator: boolean = true;
  @Input() isLoadingResults = false;
  @Input() isRateLimitReached = false;
  @Input() isModalOpen = false;

  protected selecionado!: any;

  constructor() { }

  clickGrid(valor: any) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: any): string {

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

  onEnterPress(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.abrirDialog.emit();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.preventDefault();
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isModalOpen) {
      if (event.key === 'ArrowUp') {
        this.pressionaSeta(-1)
      } else if (event.key === 'ArrowDown') {
        this.pressionaSeta(1)
      } else if (event.key === 'Enter') {
        if (this.selecionado)
          this.doubleClick();
      }
    }
  }

  private pressionaSeta(valor: number) {
    const lista = this.lista as object[];
    const index = lista.indexOf(this.selecionado);

    this.clickGrid(lista[index + valor]);
  }
}
