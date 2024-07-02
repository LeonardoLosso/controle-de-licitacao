import { Component, Inject, inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

import { Item, ItemSimplificado } from 'src/app/core/types/item';
import { MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';
import { ItensService } from '../services/itens.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss']
})
export class ModalItemComponent extends ModalCrudDirective<Item, ItemSimplificado> {
  public override permissao: number = 202;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public listaControl = new FormControl<ItemSimplificado[]>([]);
  public addOnBlur = true;
  public announcer = inject(LiveAnnouncer);

  constructor(
    dialogRef: MatDialogRef<ModalItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: Item,
    dialog: MatDialog,
    service: ItensService
  ) {
    super(dialogRef, data, dialog, service);

    this.listaControl.setValue(this.cadastro.listaItens);

    this.listaControl.valueChanges.subscribe(value => {
      if (value)
        this.cadastro.listaItens = value;
    });
  }

  toggleCesta(item: Item) {
    item.ehCesta = !item.ehCesta;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.cadastro.listaNomes.push(value);
    }

    event.chipInput!.clear();
  }

  remove(nome: string): void {
    const index = this.cadastro.listaNomes.indexOf(nome);

    if (index >= 0) {
      this.cadastro.listaNomes.splice(index, 1);

      this.announcer.announce(`Removed ${nome}`);
    }
  }

  edit(nome: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(nome);
      return;
    }

    const index = this.cadastro.listaNomes.indexOf(nome);
    if (index >= 0) {
      this.cadastro.listaNomes[index] = value;
    }
  }

  protected override submeterEdicao(): MudancasParaPatch[] {
    const mudancas: MudancasParaPatch[] = [];

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty && control.value !== control.pristine) {
        mudancas.push({ op: 'replace', path: `/${controlName}`, value: control.value });
      }
    }

    const listaNomesControl = this.form.controls['listaNomes'];
    if (listaNomesControl && listaNomesControl.dirty) {
      const nomesOriginais = this.data.listaNomes;
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
      const itensOriginais = this.data.listaItens;
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
    return mudancas;
  }

  protected override cancelar(form: NgForm) {
    super.cancelar(form, !this.listaControl.dirty);
  }

}
