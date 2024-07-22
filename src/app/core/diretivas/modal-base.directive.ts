import { Directive, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ICadastro } from '../types/auxiliares';
import { SpinnerControlDirective } from './spinner-control.directive';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Directive({})
export abstract class ModalBaseDirective<T extends ICadastro> extends SpinnerControlDirective {

  public titulo = "Novo";
  public cadastro!: T;
  public edicao = false;
  public permissao!: number;

  protected abstract acaoEditar(): void;
  protected abstract acaoNovo(): void;

  constructor(
    protected dialogRef: MatDialogRef<ModalBaseDirective<T>>,
    @Inject(MAT_DIALOG_DATA) protected data: T,
    protected dialog: MatDialog
  ) {
    super();
    this.cadastro = JSON.parse(JSON.stringify(this.data));

    if (data.id !== 0) {
      this.titulo = "Editar"
      this.edicao = true;
      this.permissao += 2;
    }
  }

  protected submeter() {
    
    this.mostrarSpinner();
    
    if (this.edicao) {
      this.acaoEditar();
    } else {
      this.acaoNovo();
    }
  };

  protected cancelar(form: any, validaExtra: boolean = true) {
    if (!form.dirty && validaExtra) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }

  private confirmarCancelar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Cancelar',
        mensagem: 'Deseja cancelar?',
        item: `\nAs alterações NÃO serão salvas`
      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });
  }

  protected validaErro(erro: string) {
    this.esconderSpinner();
    if (erro === 'token expirado') {
      this.dialogRef.close(false);
    }
  }
}
