import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalItemDocumentoBaseDirective } from 'src/app/core/diretivas/modal-item-documento-base.directive';
import { ItemDeAta, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItensComponent } from 'src/app/itens/lookup-itens/lookup-itens.component';

@Component({
  selector: 'app-modal-item-ata',
  templateUrl: './modal-item-ata.component.html',
  styleUrls: ['./modal-item-ata.component.scss']
})
export class ModalItemAtaComponent extends ModalItemDocumentoBaseDirective<ItemDeAta> {

  public lookupItem = LookupItensComponent;
  public possuiEmpenho: boolean = false;

  constructor(
    dialogRef: MatDialogRef<ModalItemAtaComponent>,
    @Inject(MAT_DIALOG_DATA) data: ItemDeAta,
    dialog: MatDialog

  ) { super(dialogRef, data, dialog) }

  protected override inicializaFormulario(itemSimp: ItemSimplificado): void {
    this.formulario = new FormGroup({
      item: new FormControl(itemSimp.id === 0 ? null : `${itemSimp.id} - ${itemSimp.nome}`),
      unidade: new FormControl(this.cadastro.unidade),
      quantidade: new FormControl(this.cadastro.quantidade),
      valorUnitario: new FormControl(this.cadastro.valorUnitario),
      valorTotal: new FormControl({ value: this.cadastro.valorTotal, disabled: true })
    });
    this.obterControle('unidade').disable();

    this.possuiEmpenho = true;

    ///FAZER A REQUISIÇÃO PARA CONFIRMAR

    if (this.possuiEmpenho) {
      this.obterControle('quantidade').disable();
    }
  }

  protected override retornaItem(): ItemDeAta {
    return {
      id: this.cadastro.id,
      ataID: this.cadastro.ataID,
      nome: this.cadastro.nome,
      unidade: this.obterControle('unidade').value as string,
      quantidade: this.obterControle('quantidade').value as number,
      valorUnitario: this.obterControle('valorUnitario').value as number,
      valorTotal: this.obterControle('valorTotal').value as number,
      desconto: 0
    }
  }
  //-----------------------------

  public lookupDeItem(ev: any) {

    const result = ev;

    if (result) {
      const item = this.obterControle('item');
      const unidade = this.obterControle('unidade');
      item.setValue(result);
      unidade.setValue(result.unidadePrimaria);

      this.cadastro.id = result.id;
      this.cadastro.nome = result.nome;
    }
  }
}
