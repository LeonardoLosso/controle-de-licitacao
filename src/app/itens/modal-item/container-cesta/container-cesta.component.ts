import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { ItemSimplificado } from 'src/app/core/types/item';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { LookupItensComponent } from '../../lookup-itens/lookup-itens.component';

@Component({
  selector: 'app-container-cesta',
  templateUrl: './container-cesta.component.html',
  styleUrls: ['./container-cesta.component.scss']
})
export class ContainerCestaComponent implements OnInit {

  @Input() listaControl!: FormControl<ItemSimplificado[] | null>;
  public listaItens!: ItemSimplificado[];
  public colunasGrid: string[] = ['codigo', 'nome', 'unidadePri', 'unidadeSec'];
  public selecionado!: FormControl;

  constructor(
    public form: FormularioBuscaService,
    private messageService: MensagemService,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.selecionado = this.form.obterControle('selecionadoGrid');

    if (this.listaControl?.value)
      this.listaItens = this.listaControl.value;
  }

  addItem() {
    const lista = this.listaItens ?? [];
    const dialogRef = this.dialog.open(LookupItensComponent, {
      disableClose: true,
      data: lista
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novoItem: ItemSimplificado = result;
        this.listaItens = this.listaItens ?? [];

        this.listaItens.push(novoItem);
        this.listaItens = [...this.listaItens];
        this.listaControl.setValue(this.listaItens);
        this.listaControl.markAsDirty();
      }
    });
  }

  removerItem() {
    const item: ItemSimplificado = this.selecionado.value;

    if (!item) {
      return this.messageService.openSnackBar('Nenhum item selecionado');
    }

    this.remover(item);
  }

  exibeTabela(): boolean {
    return this.listaItens !== null && this.listaItens?.length > 0;
  }

  private remover(item: ItemSimplificado) {
    if (this.listaItens) {
      this.listaItens = [...this.listaItens.filter(i => i.id !== item.id)];
      this.listaControl.setValue(this.listaItens);
      this.listaControl.markAsDirty();
    }
  }

}
