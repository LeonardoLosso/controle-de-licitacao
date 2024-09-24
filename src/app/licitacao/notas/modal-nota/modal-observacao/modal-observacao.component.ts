import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-observacao',
  templateUrl: './modal-observacao.component.html',
  styleUrls: ['./modal-observacao.component.scss']
})
export class ModalObservacaoComponent {

  observacao!: FormControl;
  constructor(
    private dialogRef: MatDialogRef<ModalObservacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { observacoes: string }
  ) { }

  public submeter() {
    this.dialogRef.close(this.data.observacoes);
  }
}
