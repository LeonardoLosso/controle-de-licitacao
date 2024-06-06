import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuarioSimplificado } from 'src/app/core/types/usuarios';

@Component({
  selector: 'app-usuario-tabela',
  templateUrl: './usuario-tabela.component.html',
  styleUrls: ['./usuario-tabela.component.scss']
})
export class UsuarioTabelaComponent {
  @Output() abrirDialog = new EventEmitter();
  @Input() listaUsuarios!: UsuarioSimplificado[];
  @Input() control!: FormControl;

  private selecionado!: UsuarioSimplificado;

  public isLoadingResults = false;
  public isRateLimitReached = false

  public displayedColumns: string[] = ['codigo', 'status', 'nome', 'usuario', 'cpf'];

  constructor() { }

  clickGrid(valor: UsuarioSimplificado) {
    this.selecionado = valor;
    this.control.setValue(valor);
  }

  selecionar(valor: UsuarioSimplificado): string {

    if (valor === this.selecionado) {
      return 'selecionado';
    }
    return '';
  }

  doubleClick() {
    this.abrirDialog.emit();
  }
}
