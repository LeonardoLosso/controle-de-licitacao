import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lookup-base',
  templateUrl: './lookup-base.component.html',
  styleUrls: ['./lookup-base.component.scss']
})
export class LookupBaseComponent {
  @Input() control!: FormControl;
  @Input() data!: any;
  @Input() tipoDaLookup!: Type<any>;
  @Input() apenasLeitura: boolean = false;
  @Input() label!: string;
  @Input() tipo: string = 'entidade';
  @Output() result = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  public displayFn(): string {
    if (this.apenasLeitura)
      this.control.disable()
    else
      this.control.enable()

    return this.control.value ? `${this.control.value?.id} - ${this.control.value?.fantasia ?? this.control.value?.nome}` : '';
  }

  public possuiValor(): string {
    const valor = this.control;
    return valor.value?.id ? 'close' : 'search';
  }

  public acao() {
    const control = this.control;
    if (control.value?.id) {
      return control.setValue(null);
    }
    return this.abrirLookup(this.tipoDaLookup, this.control);
  }

  limparValor() {
    const control = this.control;
    control.setValue(null);
  }

  private abrirLookup(component: Type<any>, control: FormControl) {
    const dialogRef = this.dialog.open(component, {
      disableClose: true,
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.tipo === 'entidade')
        control.setValue(result);
      else
        this.result.emit(result);
    });
  }
}
