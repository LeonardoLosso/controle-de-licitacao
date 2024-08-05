import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho, ItemDeNota } from 'src/app/core/types/item';
import { ItensService } from 'src/app/itens/services/itens.service';

@Component({
  selector: 'app-lookup-item-nota',
  templateUrl: './lookup-item-nota.component.html',
  styleUrls: ['./lookup-item-nota.component.scss']
})
export class LookupItemNotaComponent {
  public selecionado = new FormControl(null);
  public listaItens!: ItemDeEmpenho[];
  public colunas!: string[];


  public isLoadingResults = false;
  public isRateLimitReached = false;

  constructor(
    private service: ItensService,
    public dialogRef: MatDialogRef<LookupItemNotaComponent>,
    private messageService: MensagemService,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeNota,
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  private async listar() {

    this.isLoadingResults = true;

    try {
      const result = await this.listarEmpenho();
      if (result) {
        this.listaItens = result;
      }
    } catch (ex) {
      this.isRateLimitReached = true;
    } finally {
      this.isLoadingResults = false;
    }
  }

  public confirmar() {
    if (this.selecionado.value) {
      const item = this.selecionado.value as ItemDeEmpenho;
      this.data.id = item.id;
      this.data.nome = item.nome;
      this.data.unidade = item.unidade
      this.data.valorUnitario = item.valorUnitario;

      return this.dialogRef.close(this.data);
    }

    this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
  }

  private async listarEmpenho() {
    return await lastValueFrom(this.service.listarItensEmpenho(this.data.empenhoID));
  }
}
