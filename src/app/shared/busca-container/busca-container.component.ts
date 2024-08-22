import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-busca-container',
  templateUrl: './busca-container.component.html',
  styleUrls: ['./busca-container.component.scss']
})
export class BuscaContainerComponent {
  @Input() control!: FormControl
  @Input() page = true
  @Output() enterClick = new EventEmitter();

  limpaPesquisa() {
    this.control.setValue('');
  }

  classeContainer(): string {
    return this.page ? 'container-page' : 'sem-container';
  }

  onEnterPress(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.enterClick.emit();
  }
}
