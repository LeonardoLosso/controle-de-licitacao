import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalBaseDirective } from 'src/app/core/diretivas/modal-base.directive';

import { ItemDeAta, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItensComponent } from 'src/app/itens/lookup-itens/lookup-itens.component';

@Component({
  selector: 'app-modal-item-ata',
  templateUrl: './modal-item-ata.component.html',
  styleUrls: ['./modal-item-ata.component.scss']
})
export class ModalItemAtaComponent extends ModalBaseDirective<ItemDeAta> implements OnInit {

  public formulario!: FormGroup;

  constructor(
    dialogRef: MatDialogRef<ModalItemAtaComponent>,
    @Inject(MAT_DIALOG_DATA) data: ItemDeAta,
    dialog: MatDialog

  ) { super(dialogRef, data, dialog) }

  ngOnInit(): void {
    const itemSimp: ItemSimplificado = {
      id: this.cadastro.id,
      status: 1,
      ehCesta: false,
      nome: this.cadastro.nome,
      unidadePrimaria: this.cadastro.unidade,
      unidadeSecundaria: ''
    }

    this.formulario = new FormGroup({
      item: new FormControl(itemSimp.id === 0 ? null : `${itemSimp.id} - ${itemSimp.nome}`),
      unidade: new FormControl(this.cadastro.unidade),
      quantidade: new FormControl(this.cadastro.quantidade),
      valorUnitario: new FormControl(this.cadastro.valorUnitario),
      valorTotal: new FormControl({ value: this.cadastro.valorTotal, disabled: true })
    });
    this.addListeners();
  }

  protected override acaoNovo(): void {
    this.retornaItem();
  }
  protected override acaoEditar(): void {
    this.retornaItem();
  }

  //-----------------------------
  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  displayFn(): string {
    const control = this.obterControle('item');
    if (control.value && control.value.id) {
      const id = control.value.id;
      const nome = control.value.nome;
      return `${id} - ${nome}`;
    }
    return control.value;
  }

  limparValor() {
    const valor = this.obterControle('item');
    valor.setValue(null);
  }
  possuiValor(): string {
    const valor = this.obterControle('item');
    return valor.value?.id ? 'close' : 'search';
  }

  public lookupDeItem() {

    const item = this.obterControle('item');
    const unidade = this.obterControle('unidade');
    const dialogRef = this.dialog.open(LookupItensComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.setValue(result);
        unidade.setValue(result.unidadePrimaria);

        this.cadastro.id = result.id;
        this.cadastro.nome = result.nome;
      }
    });
  }
  //-----------------------------

  addListeners(): void {
    this.obterControle('quantidade').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });

    this.obterControle('valorUnitario').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });
  }

  updateValorTotal(): void {
    const quantidade = this.obterControle('quantidade').value;
    const valorUnitario = this.obterControle('valorUnitario').value;
    const valorTotal = quantidade * valorUnitario;
    this.obterControle('valorTotal').setValue(valorTotal);
  }

  private retornaItem() {
    const item: ItemDeAta = {
      id: this.cadastro.id,
      ataID: this.cadastro.ataID,
      nome: this.cadastro.nome,
      unidade: this.obterControle('unidade').value as string,
      quantidade: this.obterControle('quantidade').value as number,
      valorUnitario: this.obterControle('valorUnitario').value as number,
      valorTotal: this.obterControle('valorTotal').value as number,
      desconto: 0
    }
    this.dialogRef.close(item);
  }
}
