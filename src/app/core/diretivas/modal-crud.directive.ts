import { Directive, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { ICadastro, MudancasParaPatch } from '../types/auxiliares';
import { CrudBaseService } from '../services/crud-base.service';
import { ModalBaseDirective } from './modal-base.directive';

@Directive({})
export abstract class ModalCrudDirective<T extends ICadastro, TSimple> extends ModalBaseDirective<T> {
  @ViewChild('form') form!: NgForm;

  public botaoDesabilitado = false;

  constructor(
    dialogRef: MatDialogRef<ModalCrudDirective<T, TSimple>>,
    @Inject(MAT_DIALOG_DATA) data: T,
    dialog: MatDialog,
    protected service: CrudBaseService<T, TSimple>
  ) { super(dialogRef, data, dialog) }

  protected override acaoNovo(): void {
    this.service.criar(this.cadastro).subscribe({
      next: () => {
        this.dialogRef.close(true);
      }, error: (err) => {
        this.validaErro(err.message);
      }
    });
  }
  protected override acaoEditar() {
    const mudancas = this.editar();
    if (mudancas.length > 0) {
      this.service.editar(mudancas, this.cadastro.id).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }, error: (err) => {
          this.validaErro(err.message);
        }
      });
    } else { this.dialogRef.close() }
  }

  protected editar(): MudancasParaPatch[] {
    const mudancas: MudancasParaPatch[] = [];

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty && control.value !== control.pristine) {
        mudancas.push({ op: 'replace', path: `/${controlName}`, value: control.value });
      }
    }
    return mudancas;
  };

  protected onHasPermission(hasPermission: boolean) {
    setTimeout(() => {
      this.botaoDesabilitado = !hasPermission;
    }, 0);
  }
}
