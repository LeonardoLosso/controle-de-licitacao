import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmpenhoPolicia } from 'src/app/core/types/documentos';
import { ModalBaseDirective } from 'src/app/core/diretivas/modal-base.directive';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-empenho',
  templateUrl: './modal-empenho.component.html',
  styleUrls: ['./modal-empenho.component.scss']
})
export class ModalEmpenhoComponent extends ModalBaseDirective<EmpenhoPolicia> {

  public formulario!: FormGroup;

  constructor(
    dialogRef: MatDialogRef<ModalEmpenhoComponent>,
    @Inject(MAT_DIALOG_DATA) data: EmpenhoPolicia,
    dialog: MatDialog

  ) {
    super(dialogRef, data, dialog)
    this.formulario = new FormGroup({
      numEmpenho: new FormControl(this.cadastro.numEmpenho),
      numNota: new FormControl(this.cadastro.numNota),
      dataEmpenho: new FormControl(this.cadastro.dataEmpenho),
      valor: new FormControl(this.cadastro.valor)
    });
  }

  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  protected override acaoEditar(): void {
    const empenho = this.retornaEmpenho();
    this.dialogRef.close(empenho);
  }
  protected override acaoNovo(): void {
    const empenho = this.retornaEmpenho();
    this.dialogRef.close(empenho);
  }
  private retornaEmpenho(): EmpenhoPolicia {
    return {
      id: this.cadastro.id,
      baixaID: this.cadastro.baixaID,
      edital: this.cadastro.edital,
      numEmpenho: this.obterControle('numEmpenho').value as string,
      numNota: this.obterControle('numNota').value as string,
      dataEmpenho: this.obterControle('dataEmpenho').value,
      valor: this.obterControle('valor').value as number
    }
  }
}

