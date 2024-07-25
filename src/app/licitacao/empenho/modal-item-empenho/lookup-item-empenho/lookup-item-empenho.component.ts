import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, lastValueFrom } from 'rxjs';

import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeBaixa, ItemDeEmpenho } from 'src/app/core/types/item';
import { LookupItensComponent } from 'src/app/itens/lookup-itens/lookup-itens.component';
import { ItensService } from 'src/app/itens/services/itens.service';

@Component({
  selector: 'app-lookup-item-empenho',
  templateUrl: './lookup-item-empenho.component.html',
  styleUrls: ['./lookup-item-empenho.component.scss']
})
export class LookupItemEmpenhoComponent implements OnInit {

  public query = new FormControl('baixa');
  public selecionado = new FormControl(null);
  public pesquisa = new FormControl('');
  public listaItens!: ItemDeBaixa[];
  public colunasGrid!: string[];

  public isLoadingResults = false;
  public isRateLimitReached = false;

  private colunasBaixa = [
    'codigo', 'nome', 'unidade',
    'qtdeAEmpenhar', 'saldo', 'valorUnitario'
  ]

  private colunasGeral = ['codigo', 'nome', 'unidade']

  constructor(
    private service: ItensService,
    public dialogRef: MatDialogRef<LookupItensComponent>,
    private messageService: MensagemService,
    @Inject(MAT_DIALOG_DATA) public data: ItemDeEmpenho,
  ) {
    this.colunasGrid = this.colunasBaixa;
    this.pesquisa.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe((value) => {
        this.listar();
      })

    this.query.valueChanges.subscribe((value) => {
      this.colunasGrid = value === 'baixa' ? this.colunasBaixa : this.colunasGeral;
      this.listar();
    })
  }

  ngOnInit(): void {
    this.listar();
  }

  public confirmar() {
    if (this.selecionado.value) {
      const item = this.selecionado.value as ItemDeEmpenho;
      item.itemDeBaixa = this.query.value === 'baixa';
      
      this.messageService.openSnackBar('Item adicionado', 'success');
      return this.dialogRef.close(item);
    }

    this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
  }

  private async listar() {
    const ehBaixa = this.query.value === 'baixa';
    const params = [
      { key: 'search', value: this.pesquisa.value ?? '' }

    ]

    this.isLoadingResults = true;

    if (!ehBaixa)
      params.push({ key: 'status', value: 1 as any })
    try {
      const result = ehBaixa ? await this.listarBaixa(params) : await this.listarGeral(params);
      if (result) {
        if (ehBaixa) {
          this.listaItens = result as ItemDeBaixa[];
        } else {
          this.trataResult(result);
        }
      }
    } catch (ex) {
      this.isRateLimitReached = true;
    } finally {
      this.isLoadingResults = false;
    }

  }

  private async listarGeral(params: { key: string, value: any }[]) {
    return await lastValueFrom(this.service.listar(undefined, params));
  }

  private async listarBaixa(params: { key: string, value: any }[]) {
    return await lastValueFrom(this.service.listarItensBaixa(this.data.baixaID, params));
  }

  private trataResult(result: any) {
    const lista: ItemDeBaixa[] = [];
    for (let item of result.lista) {
      const itemBaixa: any = {
        id: item.id,
        nome: item.nome,
        unidade: item.unidadePrimaria,
        valorUnitario: 0
      }
      lista.push(itemBaixa);
    }
    this.listaItens = lista;
  }
}
