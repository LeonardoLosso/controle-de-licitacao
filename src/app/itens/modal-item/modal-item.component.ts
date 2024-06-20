import { Component, Inject, inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Item, ItemSimplificado } from 'src/app/core/types/item';
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
  public listaControl = new FormControl<ItemSimplificado[]>([]);
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
    
    this.listaControl.setValue(this.item.listaItens);

    this.listaControl.valueChanges.subscribe(value => {
      if(value)
        this.item.listaItens = value;
    });
  }
  
  cancelar(form: NgForm) {
    if (!form.dirty && !this.listaControl.dirty) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }

  toggleCesta(item: Item) {
    item.ehCesta = !item.ehCesta;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.item.listaNomes.push(value);
    }

    event.chipInput!.clear();
  }

  remove(nome: string): void {
    const index = this.item.listaNomes.indexOf(nome);

    if (index >= 0) {
      this.item.listaNomes.splice(index, 1);

      this.announcer.announce(`Removed ${nome}`);
    }
  }

  edit(nome: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(nome);
      return;
    }

    const index = this.item.listaNomes.indexOf(nome);
    if (index >= 0) {
      this.item.listaNomes[index] = value;
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
