import { Component, Inject } from '@angular/core';
import { ModalItemDocumentoBaseDirective } from 'src/app/core/diretivas/modal-item-documento-base.directive';
import { ItemDeNota, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItemNotaComponent } from '../lookup-item-nota/lookup-item-nota.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-item-nota',
  templateUrl: './modal-item-nota.component.html',
  styleUrls: ['./modal-item-nota.component.scss']
})
export class ModalItemNotaComponent extends ModalItemDocumentoBaseDirective<ItemDeNota> {

  public lookupItem = LookupItemNotaComponent;
  public apenasLeitura = false;
  constructor(
    dialogRef: MatDialogRef<ModalItemNotaComponent>,
    @Inject(MAT_DIALOG_DATA) data: ItemDeNota,
    dialog: MatDialog
  ) { super(dialogRef, data, dialog) }

  protected override inicializaFormulario(itemSimp: ItemSimplificado): void {
    this.formulario = new FormGroup({
      item: new FormControl(itemSimp.id === 0 ? null : `${itemSimp.id} - ${itemSimp.nome}`),
      unidade: new FormControl({ value: this.cadastro.unidade, disabled: true }),
      quantidade: new FormControl(this.cadastro.quantidade),
      valorUnitario: new FormControl({ value: this.cadastro.valorUnitario, disabled: true }),
      valorTotal: new FormControl({ value: this.cadastro.valorTotal, disabled: true })
    });
    this.desabilitarForm();
  }

  protected override retornaItem(): ItemDeNota {
    const unidade = this.obterControle('unidade').value as string
    const quantidade = this.obterControle('quantidade').value as number;
    const valorUnitario = this.obterControle('valorUnitario').value as number;
    const total = this.obterControle('valorTotal').value as number;

    return {
      id: this.cadastro.id,
      nome: this.cadastro.nome,
      empenhoID: this.cadastro.empenhoID,
      notaID: this.cadastro.notaID,
      quantidade: quantidade,
      unidade: unidade,
      valorUnitario: valorUnitario,
      valorTotal: total
    }
  }

  public async lookupDeItem(ev: ItemDeNota) {
    const result = ev;

    if(result){
      const item = this.obterControle('item');
      const unidade = this.obterControle('unidade');
      const valorUnitario = this.obterControle('valorUnitario');

      this.cadastro.id = result.id;
      this.cadastro.nome = result.nome;

      item.setValue(result);
      unidade.setValue(result.unidade);
      valorUnitario.setValue(result.valorUnitario);
    }
  }

  private desabilitarForm() {
    const item = this.obterControle('item');

    if (item.value) {
      this.apenasLeitura = true;
    }
  }
}
