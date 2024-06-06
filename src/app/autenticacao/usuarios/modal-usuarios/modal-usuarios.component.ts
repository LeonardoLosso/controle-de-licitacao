import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { EnumUF } from 'src/app/core/types/enum';
import { Usuario } from 'src/app/core/types/usuarios';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.scss']
})
export class ModalUsuariosComponent {
  public usuario!: Usuario;
  public titulo = "Novo Cadastro";
  public estados = EnumUF;

  constructor(
    public dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog,

  ) {
    this.usuario = { ...data };

    if (data.ID !== 0) {
      this.titulo = "Editar Cadastro"
    }

  }


  displayFnEstados = (id: string): string => {
    const estado = this.estados.find(estado => estado.id === id);
    return estado ? `${estado.id} - ${estado.nome}` : '';
  }

  cancelar(form: NgForm) {
    if (!form.dirty) {
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
}
