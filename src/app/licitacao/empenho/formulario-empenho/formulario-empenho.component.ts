import { Component, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { FormularioEmpenhoService } from '../../services/formulario-empenho.service';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';

@Component({
  selector: 'app-formulario-empenho',
  templateUrl: './formulario-empenho.component.html',
  styleUrls: ['./formulario-empenho.component.scss']
})
export class FormularioEmpenhoComponent {

  constructor(
    public formService: FormularioEmpenhoService,
    private dialog: MatDialog
  ) { }

  public displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.fantasia}` : '';
  }

  public acao() {
    const valor = this.formService.obterControle('unidade');
    if (valor.value?.id) {
      return valor.setValue(null);
    }
    return this.abrirLookup(LookupEntidadesComponent, valor);
  }
  public possuiValor(): string {
    const valor = this.formService.obterControle('unidade');
    return valor.value?.id ? 'close' : 'search';
  }

  private abrirLookup(component: Type<any>, valor: FormControl) {
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      data: 'orgao'
    });

    dialogRef.afterClosed().subscribe(result => {
      valor.setValue(result);
    });
  }
}
