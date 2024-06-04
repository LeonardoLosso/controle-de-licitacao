import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botoes',
  templateUrl: './botoes.component.html',
  styleUrls: ['./botoes.component.scss']
})
export class BotoesComponent {
  @Input() icone!: string;
  @Input() texto!: string;
  @Input() path!: string;
  @Input() color: string = 'primary'
  @Input() variant: 'btn-principal' | 'btn-cabecalho' = 'btn-principal'
}
