import { Directive, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { IItem } from '../types/auxiliares';
import { ModalBaseDirective } from './modal-base.directive';
import { ItemSimplificado } from '../types/item';

@Directive({})
export abstract class ModalItemDocumentoBaseDirective<T extends IItem> extends ModalBaseDirective<T> implements OnInit {
  
  public formulario!: FormGroup;

  protected abstract inicializaFormulario(itemSimp: ItemSimplificado): void;
  protected abstract retornaItem(): T;

  constructor(
    dialogRef: MatDialogRef<ModalItemDocumentoBaseDirective<T>>,
    @Inject(MAT_DIALOG_DATA) data: T,
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

    this.inicializaFormulario(itemSimp);
    this.addListeners();
  }

  protected override acaoNovo(): void {
    const item = this.retornaItem();
    this.dialogRef.close(item);
  }
  protected override acaoEditar(): void {
    const item = this.retornaItem();
    this.dialogRef.close(item);
  }
  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  private addListeners(): void {
    this.obterControle('quantidade').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });

    this.obterControle('valorUnitario').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });
  }
  private updateValorTotal(): void {
    const quantidade = this.obterControle('quantidade').value;
    const valorUnitario = this.obterControle('valorUnitario').value;
    const valorTotal = quantidade * valorUnitario;
    this.obterControle('valorTotal').setValue(valorTotal);
  }
}
