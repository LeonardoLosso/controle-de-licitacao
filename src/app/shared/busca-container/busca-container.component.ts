import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-busca-container',
  templateUrl: './busca-container.component.html',
  styleUrls: ['./busca-container.component.scss']
})
export class BuscaContainerComponent {
  @Input() control!: FormControl
  @Input() page = true

  limpaPesquisa() {
    this.control.setValue('');
  }

  classeContainer(): string {
    return this.page ? 'container-page' : 'sem-container';
  }
}
