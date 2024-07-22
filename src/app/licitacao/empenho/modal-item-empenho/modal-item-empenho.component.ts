import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalItemDocumentoBaseDirective } from 'src/app/core/diretivas/modal-item-documento-base.directive';
import { ItemDeEmpenho, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItemEmpenhoComponent } from './lookup-item-empenho/lookup-item-empenho.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-item-empenho',
  templateUrl: './modal-item-empenho.component.html',
  styleUrls: ['./modal-item-empenho.component.scss']
})
export class ModalItemEmpenhoComponent extends ModalItemDocumentoBaseDirective<ItemDeEmpenho> {


  constructor(
    dialogRef: MatDialogRef<ModalItemEmpenhoComponent>,
    @Inject(MAT_DIALOG_DATA) data: ItemDeEmpenho,
    dialog: MatDialog
  ) { super(dialogRef, data, dialog) }


  protected override inicializaFormulario(itemSimp: ItemSimplificado) {
    this.formulario = new FormGroup({
      item: new FormControl(itemSimp.id === 0 ? null : `${itemSimp.id} - ${itemSimp.nome}`),
      unidade: new FormControl(this.cadastro.unidade),
      quantidade: new FormControl(this.cadastro.qtdeEmpenhada),
      valorUnitario: new FormControl(this.cadastro.valorUnitario),
      valorTotal: new FormControl({ value: this.cadastro.total, disabled: true })
    });
  }
  protected override retornaItem(): ItemDeEmpenho {
    return {
      id: this.cadastro.id,
      baixaID: this.cadastro.baixaID,
      empenhoId: this.cadastro.empenhoId,
      nome: this.cadastro.nome,
      unidade: this.obterControle('unidade').value as string,
      qtdeEmpenhada: this.obterControle('quantidade').value as number,
      qtdeEntregue: this.cadastro.qtdeEntregue,
      qtdeAEntregar: this.cadastro.qtdeAEntregar,
      valorEntregue: this.cadastro.valorEntregue,
      valorUnitario: this.obterControle('valorUnitario').value as number,
      total: this.obterControle('valorTotal').value as number
    }
  }

  public async lookupDeItem() {

    const result = await this.retornaLookup();

    if (result) {
      const item = this.obterControle('item');
      const unidade = this.obterControle('unidade');
      const valorUnitario = this.obterControle('valorUnitario');

      item.setValue(result);
      unidade.setValue(result.unidade);
      valorUnitario.setValue(result.valorUnitario);
      
      this.cadastro.id = result.id;
      this.cadastro.nome = result.nome;
    }
  }

  public async retornaLookup() {

    const dialogRef = this.dialog.open(LookupItemEmpenhoComponent, {
      disableClose: true,
      data: this.data
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }
}
