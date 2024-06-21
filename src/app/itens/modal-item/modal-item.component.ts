import { Component, Inject, ViewChild, inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { Item, ItemSimplificado } from 'src/app/core/types/item';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MudancasParaPatch } from 'src/app/core/types/auxiliares';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('itemForm') itemForm!: NgForm;

  public item!: Item;
  public itemOriginal!: Item;
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
      this.itemOriginal = JSON.parse(JSON.stringify(this.item));
    }

    this.listaControl.setValue(this.item.listaItens);

    this.listaControl.valueChanges.subscribe(value => {
      if (value)
        this.item.listaItens = value;
    });
  }
  submeter() {
    if (this.data.id !== 0) {
      const mudancas: MudancasParaPatch[] = [];

      for (const controlName in this.itemForm.controls) {
        const control = this.itemForm.controls[controlName];
        if (control.dirty && control.value !== control.pristine) {
          mudancas.push({ op: 'replace', path: `/${controlName}`, value: control.value });
        }
      }

      const listaNomesControl = this.itemForm.controls['listaNomes'];
      if (listaNomesControl && listaNomesControl.dirty) {
        const nomesOriginais = this.itemOriginal.listaNomes;
        const nomesNovos = listaNomesControl.value;

        // Adicionados
        for (const nome of nomesNovos) {
          if (!nomesOriginais.includes(nome)) {
            mudancas.push({ op: 'add', path: '/listaNomes/-', value: nome });
          }
        }

        // Removidos
        for (const nome of nomesOriginais) {
          if (!nomesNovos.includes(nome)) {
            mudancas.push({ op: 'remove', path: `/listaNomes/${nomesOriginais.indexOf(nome)}` });
          }
        }
      }

      if (this.listaControl.dirty) {
        const itensOriginais = this.itemOriginal.listaItens;
        const itensNovos = this.listaControl.value as ItemSimplificado[];

        // Adicionados
        for (const item of itensNovos) {
          if (!itensOriginais.some(i => i.id === item.id)) {
            mudancas.push({ op: 'add', path: '/listaItens/-', value: item });
          }
        }

        // Removidos
        for (const item of itensOriginais) {
          if (!itensNovos.some(i => i.id === item.id)) {
            mudancas.push({ op: 'remove', path: `/listaItens/${itensOriginais.indexOf(item)}` });
          }
        }
      }
      return this.dialogRef.close(mudancas);
    }

    return this.dialogRef.close(this.item);
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
