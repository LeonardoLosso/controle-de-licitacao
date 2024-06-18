import { Component, OnInit, Type } from '@angular/core';
import { FormularioAtaService } from '../../services/formulario-ata.service';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { EnumTipoCadastro } from 'src/app/core/types/enum';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';

@Component({
  selector: 'app-formulario-ata',
  templateUrl: './formulario-ata.component.html',
  styleUrls: ['./formulario-ata.component.scss']
})
export class FormularioAtaComponent implements OnInit{

  options = EnumTipoCadastro;
  statusControl!: FormControl<number>;

  constructor(
    public formService: FormularioAtaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.statusControl = this.formService.obterControle<number>('status');
  }

  displayUnidade(val: EnumNumberID): string {
    return val && val.nome ? `${val.nome}` : '';
  }

  acao(control: string) {
    const valor = this.formService.obterControle(control);
    if (valor.value?.id) {
      return valor.setValue(null);
    }
    switch (control) {
      case 'empresa':
        return this.abrirLookup(LookupEntidadesComponent, valor, 'empresa');
      case 'orgao':
        return this.abrirLookup(LookupEntidadesComponent, valor)
    }
  }

  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.nome}` : '';
  }

  limparValor(control: string) {
    const valor = this.formService.obterControle(control);
    valor.setValue(null);
  }

  possuiValor(control: string): string {
    const valor = this.formService.obterControle(control);
    return valor.value?.id ? 'close' : 'search';
  }
  
  desabilitado(): boolean{
    return this.statusControl.value === 2;
  }

  private abrirLookup(component: Type<any>, valor: FormControl, filtro: string = 'orgao') {
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      data: filtro
    });

    dialogRef.afterClosed().subscribe(result => {
      valor.setValue(result);
    });
  }
}
