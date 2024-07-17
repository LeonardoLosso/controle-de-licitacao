import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ItemSimplificado } from 'src/app/core/types/item';
import { ItensService } from '../services/itens.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-lookup-itens',
  templateUrl: './lookup-itens.component.html',
  styleUrls: ['./lookup-itens.component.scss']
})
export class LookupItensComponent implements OnInit {

  public selecionado = new FormControl(null);
  public pesquisa = new FormControl('');
  public listaItens!: ItemSimplificado[];
  public colunasGrid: string[] = ['codigo', 'nome', 'unidadePri', 'unidadeSec'];

  public isLoadingResults = false;
  public isRateLimitReached = false;

  constructor(
    private service: ItensService,
    public dialogRef: MatDialogRef<LookupItensComponent>,
    private messageService: MensagemService,
    @Inject(MAT_DIALOG_DATA) public data: ItemSimplificado[],
  ) {
    this.pesquisa.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe((value) => {
        this.listar();
      })
  }

  ngOnInit(): void {
    this.listar();
  }

  public confirmar() {
    if (this.selecionado.value) {
      const item = this.selecionado.value as ItemSimplificado;

      if (this.data && this.data.find(f => f.id === item.id))
        return this.messageService.openSnackBar('Esse item já foi adicionado à cesta');

      this.messageService.openSnackBar('Item adicionado', 'success');
      return this.dialogRef.close(item);
    }

    this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
  }

  private listar() {
    const params = [
      { key: 'status', value: 1 as any }
    ]

    if (this.data)
      params.push({ key: 'tipo', value: 'Item' });

    params.push({ key: 'search', value: this.pesquisa.value ?? '' })

    this.isLoadingResults = true;

    this.service.listar(undefined, params).subscribe({
      next: result => {
        this.isLoadingResults = false;
        this.listaItens = result.lista;
      }, error: () => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
      }
    });
  }
}
