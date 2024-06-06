import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { FormularioBuscaService } from '../services/formulario-busca.service';
import { ItemSimplificado } from 'src/app/core/types/item';
import { ItensService } from '../services/itens.service';

@Component({
  selector: 'app-lookup-itens',
  templateUrl: './lookup-itens.component.html',
  styleUrls: ['./lookup-itens.component.scss']
})
export class LookupItensComponent implements OnInit {

  public selecionado!: FormControl;
  public pesquisa!: FormControl;
  public listaItens!: ItemSimplificado[];
  public colunasGrid: string[] = ['codigo', 'nome', 'unidadePri', 'unidadeSec'];

  constructor(
    public form: FormularioBuscaService,
    private service: ItensService,
    public dialogRef: MatDialogRef<LookupItensComponent>
  ) { }

  ngOnInit(): void {
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');
    this.listar();
  }

  public confirmar() {
    this.dialogRef.close(this.selecionado.value as ItemSimplificado);
  }

  private listar() {
    //filtra por status x tipo
    this.service.listar().subscribe({
      next: result => {
        this.listaItens = result;
      }
    });
  }
}
