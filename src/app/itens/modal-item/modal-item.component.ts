import { Component, Inject, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Item } from 'src/app/core/types/item';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public item!: Item;
  public titulo = "Novo Item";

  addOnBlur = true;
  announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<ModalItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private dialog: MatDialog,

  ) {
    this.item = { ...data };

    if (data.id !== 0) {
      this.titulo = "Editar Item"
    }

  }
  
  cancelar(form: NgForm) {
    if (!form.dirty) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }

  togglePermissao(item: Item) {
    item.EhCesta = !item.EhCesta;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.item.ListaNomes.push(value);
    }

    event.chipInput!.clear();
  }

  remove(nome: string): void {
    const index = this.item.ListaNomes.indexOf(nome);

    if (index >= 0) {
      this.item.ListaNomes.splice(index, 1);

      this.announcer.announce(`Removed ${nome}`);
    }
  }

  edit(nome: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(nome);
      return;
    }

    const index = this.item.ListaNomes.indexOf(nome);
    if (index >= 0) {
      this.item.ListaNomes[index] = value;
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
