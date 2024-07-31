import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalItemDocumentoBaseDirective } from 'src/app/core/diretivas/modal-item-documento-base.directive';
import { ItemDeEmpenho, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItemEmpenhoComponent } from './lookup-item-empenho/lookup-item-empenho.component';

@Component({
  selector: 'app-modal-item-empenho',
  templateUrl: './modal-item-empenho.component.html',
  styleUrls: ['./modal-item-empenho.component.scss']
})
export class ModalItemEmpenhoComponent extends ModalItemDocumentoBaseDirective<ItemDeEmpenho> {

  public lookupItem = LookupItemEmpenhoComponent;

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
    this.desabilitarForm();

    const item = this.obterControle('item');
    item.valueChanges.subscribe(() => this.desabilitarForm())
  }
  protected override retornaItem(): ItemDeEmpenho {
    const unidade = this.obterControle('unidade').value as string
    const qtdeEmpenhada = this.obterControle('quantidade').value as number;
    const valorUnitario = this.obterControle('valorUnitario').value as number;
    const total = this.obterControle('valorTotal').value as number;
    return {
      id: this.cadastro.id,
      baixaID: this.cadastro.baixaID,
      empenhoId: this.cadastro.empenhoId,
      nome: this.cadastro.nome,
      unidade: unidade,
      qtdeEmpenhada: qtdeEmpenhada,
      qtdeEntregue: this.cadastro.qtdeEntregue,
      qtdeAEntregar: qtdeEmpenhada - this.cadastro.qtdeEntregue,
      valorEntregue: this.cadastro.valorEntregue,
      valorUnitario: valorUnitario,
      itemDeBaixa: this.cadastro.itemDeBaixa,
      total: total
    }
  }

  public async lookupDeItem(ev: any) {

    const result = ev;

    if (result) {
      const item = this.obterControle('item');
      const unidade = this.obterControle('unidade');
      const valorUnitario = this.obterControle('valorUnitario');

      this.cadastro.id = result.id;
      this.cadastro.nome = result.nome;
      this.cadastro.itemDeBaixa = result.itemDeBaixa;

      item.setValue(result);
      unidade.setValue(result.unidade);
      valorUnitario.setValue(result.valorUnitario);

    }
  }

  private desabilitarForm() {
    const unidade = this.obterControle('unidade');
    const valorUnitario = this.obterControle('valorUnitario');

    if (this.cadastro.itemDeBaixa) {
      unidade.disable();
      valorUnitario.disable();
    } else {
      unidade.enable();
      valorUnitario.enable();
    }
  }
}
