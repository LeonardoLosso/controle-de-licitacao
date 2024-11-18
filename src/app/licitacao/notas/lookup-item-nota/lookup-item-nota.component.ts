import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinct, distinctUntilChanged, lastValueFrom } from 'rxjs';

import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho, ItemDeNota } from 'src/app/core/types/item';
import { ItensService } from 'src/app/itens/services/itens.service';

@Component({
  selector: 'app-lookup-item-nota',
  templateUrl: './lookup-item-nota.component.html',
  styleUrls: ['./lookup-item-nota.component.scss']
})
export class LookupItemNotaComponent {

  public pesquisa = new FormControl('');
  public selecionado = new FormControl(null);
  public listaItens!: ItemDeEmpenho[];
  public colunas!: string[];


  public isLoadingResults = false;
  public isRateLimitReached = false;

  constructor(
    private service: ItensService,
    public dialogRef: MatDialogRef<LookupItemNotaComponent>,
    private messageService: MensagemService,
    @Inject(MAT_DIALOG_DATA) public data: { policia: boolean, item: ItemDeNota },
  ) {
    this.pesquisa.setValue('');
    this.pesquisa.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe((value) => {
        this.listar();
      })
  }

  ngOnInit(): void {
    this.listar();
  }

  private async listar() {
    this.isLoadingResults = true;
    try {
      if (!this.data.policia) {
        const result = await this.listarEmpenho();
        if (result) {
          this.listaItens = result;
        }
      } else {
        const result = await this.listarItens();
        if (result) {
          this.listaItens = result.lista.map(item => {
            return {
              id: item.id,
              nome: item.nome,
              unidade: item.unidadePrimaria,
              valorUnitario: 0
            }
          }) as ItemDeEmpenho[]
        }
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
      this.data.item.id = item.id;
      this.data.item.nome = item.nome;
      this.data.item.unidade = item.unidade;
      this.data.item.valorUnitario = item.valorUnitario ?? 0;

      return this.dialogRef.close(this.data.item);
    }

    this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
  }

  private async listarEmpenho() {
    const search = this.pesquisa.value ?? '';
    return await lastValueFrom(this.service.listarItensEmpenho(this.data.item.empenhoID, search));
  }
  private async listarItens() {
    const params = [
      { key: 'status', value: 1 as any }
    ]
    params.push({ key: 'search', value: this.pesquisa.value ?? '' });

    return await lastValueFrom(this.service.listar(undefined, params));
  }
}
