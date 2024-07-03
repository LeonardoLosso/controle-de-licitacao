import { Directive, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ICadastro, MudancasParaPatch } from '../types/auxiliares';
import { CrudBaseService } from '../services/crud-base.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@Directive({})
export abstract class ModalCrudDirective<T extends ICadastro, TSimple> {
  @ViewChild('loadingSpinnerContainer', { read: ViewContainerRef }) loadingSpinnerContainer!: ViewContainerRef;
  @ViewChild('form') form!: NgForm;

  public cadastro!: T;
  public edicao = false;

  public titulo = "Novo Cadastro";
  public permissao!: number;
  public botaoDesabilitado = false;

  protected abstract submeterEdicao(): MudancasParaPatch[];

  constructor(
    public dialogRef: MatDialogRef<ModalCrudDirective<T, TSimple>>,
    @Inject(MAT_DIALOG_DATA) protected data: T,
    private dialog: MatDialog,
    protected service: CrudBaseService<T, TSimple>
  ) {
    this.cadastro = JSON.parse(JSON.stringify(this.data));

    if (data.id !== 0) {
      this.titulo = "Editar Cadastro"
      this.edicao = true;
      this.permissao += 2;
    }
  }

  protected submeter() {
    this.mostrarSpinner();
    if (this.edicao) {
      const mudancas = this.submeterEdicao();
      if (mudancas.length > 0) {
        this.service.editar(mudancas, this.cadastro.id).subscribe({
          next: () => {
            this.dialogRef.close(true);
          }, error: (err) => {
            this.validaErro(err.message);
          }
        });
      } else { this.esconderSpinner(); }
    } else {
      this.service.criar(this.cadastro).subscribe({
        next: () => {
          this.dialogRef.close(true);
        }, error: (err) => {
          this.validaErro(err.message);
        }
      });
    }
  }

  protected onHasPermission(hasPermission: boolean) {
    setTimeout(() => {
      this.botaoDesabilitado = !hasPermission;
    }, 0);
  }

  protected cancelar(form: NgForm, validaExtra: boolean = false) {
    if (!form.dirty && validaExtra) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }

  private mostrarSpinner() {
    this.loadingSpinnerContainer.createComponent(LoadingSpinnerComponent);
  }

  private esconderSpinner() {
    this.loadingSpinnerContainer.clear();
  }
  private validaErro(erro: string) {
    this.esconderSpinner();
    if (erro === 'token expirado') {
      this.dialogRef.close(false);
    }
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

}
