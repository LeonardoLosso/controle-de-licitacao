import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemDeAta, ItemSimplificado } from 'src/app/core/types/item';
import { LookupItensComponent } from 'src/app/itens/lookup-itens/lookup-itens.component';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-modal-item-ata',
  templateUrl: './modal-item-ata.component.html',
  styleUrls: ['./modal-item-ata.component.scss']
})
export class ModalItemAtaComponent {

  public item!: ItemDeAta;
  public titulo = "Novo Item";
  public formulario!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalItemAtaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeAta,
    private dialog: MatDialog

  ) {
    this.item = { ...data };
    const itemSimp: ItemSimplificado = {
      EhCesta: false,
      id: this.item.id,
      nome: this.item.nome,
      status: 1,
      UnidadePrimaria: this.item.Unidade,
      UnidadeSecundaria: ''
    }

    this.formulario = new FormGroup({
      item: new FormControl(itemSimp.id === 0? null : itemSimp),
      unidade: new FormControl(this.item.Unidade),
      quantidade: new FormControl(this.item.Quantidade),
      valorUnitario: new FormControl(this.item.ValorUnitario),
      valorTotal: new FormControl({ value: this.item.ValorTotal, disabled: true })
    });
    this.addListeners();

    if (data.id !== 0) {
      this.titulo = "Editar Item"
    }

  }

  cancelar() {
    if (!this.formulario.dirty) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }
  confirmar() {
    const item: ItemDeAta = {
      id: this.item.id,
      nome: this.item.nome,
      Unidade: this.obterControle('unidade').value as string,
      Quantidade: this.obterControle('quantidade').value as number,
      ValorUnitario: this.obterControle('valorUnitario').value as number,
      ValorTotal: this.obterControle('valorTotal').value as number,
      Desconto: 0
    }
    this.dialogRef.close(item)
  }
  //-----------------------------
  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  displayFn(control: FormControl): string {
    return control.value ? `${control.value?.id} - ${control.value?.nome}` : '';
  }
  limparValor() {
    const valor = this.obterControle('item');
    valor.setValue(null);
  }
  possuiValor(): string {
    const valor = this.obterControle('item');
    return valor.value?.id ? 'close' : 'search';
  }

  public lookupDeItem() {

    const item = this.obterControle('item');
    const unidade = this.obterControle('unidade');
    const dialogRef = this.dialog.open(LookupItensComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.setValue(result);
        unidade.setValue(result.UnidadePrimaria);

        this.item.id = result.id;
        this.item.nome = result.nome;
      }
    });
  }
  //-----------------------------
  
  addListeners(): void {
    this.obterControle('quantidade').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });

    this.obterControle('valorUnitario').valueChanges.subscribe(() => {
      this.updateValorTotal();
    });
  }

  updateValorTotal(): void {
    const quantidade = this.obterControle('quantidade').value;
    const valorUnitario = this.obterControle('valorUnitario').value;
    const valorTotal = quantidade * valorUnitario;
    this.obterControle('valorTotal').setValue(valorTotal);
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
