import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { Nota } from 'src/app/core/types/documentos';
import { NotasService } from '../../services/notas.service';
import { ModalBaseDirective } from 'src/app/core/diretivas/modal-base.directive';
import { ItemDeNota } from 'src/app/core/types/item';
import { ModalItemNotaComponent } from '../modal-item-nota/modal-item-nota.component';

@Component({
  selector: 'app-modal-nota',
  templateUrl: './modal-nota.component.html',
  styleUrls: ['./modal-nota.component.scss']
})
export class ModalNotaComponent extends ModalBaseDirective<Nota> {

  public override permissao: number = 502;
  public botaoDesabilitado = false;

  public unidadeControl = new FormControl();
  public listaItens!: ItemDeNota[];
  public listaControl = new FormControl<ItemDeNota[]>([]);
  public selecionado!: FormControl<ItemDeNota>;

  constructor(
    dialogRef: MatDialogRef<ModalNotaComponent>,
    @Inject(MAT_DIALOG_DATA) data: Nota,
    dialog: MatDialog,
    private service: NotasService
  ) {
    super(dialogRef, data, dialog);

    if (this.cadastro.unidade)
      this.unidadeControl.setValue(`${this.cadastro.unidade.id} - ${this.cadastro.unidade.fantasia}`);

    this.listaItens = this.cadastro.itens;
    this.listaControl.setValue(this.listaItens);
  }

  public async addItem() {
    const itemVazio: ItemDeNota = {
      id: 0,
      nome: '',
      empenhoID: this.cadastro.empenhoID,
      notaID: this.cadastro.id,
      quantidade: 0,
      unidade: '',
      valorTotal: 0,
      valorUnitario: 0
    };
    const novoItem = await this.abreModalItem(itemVazio);
    if (novoItem) {
      this.listaItens = this.listaItens ?? [];

      this.listaItens.push(novoItem);
      this.listaItens = [...this.listaItens];
      this.listaControl.setValue(this.listaItens);
      this.listaControl.markAsDirty();
    }
  }

  public editarItem() {

  }

  public removerItem() {

  }
  protected override acaoEditar(): void {

  }

  protected override acaoNovo(): void {

  }

  protected onHasPermission(hasPermission: boolean) {
    setTimeout(() => {
      this.botaoDesabilitado = !hasPermission;
    }, 0);
  }

  private async abreModalItem(item: ItemDeNota): Promise<ItemDeNota> {
    const dialogRef = this.dialog.open(ModalItemNotaComponent, {
      disableClose: true,
      data: item
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }
}
