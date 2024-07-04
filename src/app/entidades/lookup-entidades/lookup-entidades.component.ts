import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EntidadeSimplificada } from 'src/app/core/types/entidade';
import { FormularioBuscaService } from '../services/formulario-busca.service';
import { EntidadesService } from '../services/entidades.service';

@Component({
  selector: 'app-lookup-entidades',
  templateUrl: './lookup-entidades.component.html',
  styleUrls: ['./lookup-entidades.component.scss']
})
export class LookupEntidadesComponent {

  public selecionado!: FormControl;
  public pesquisa!: FormControl;
  public listaEntidades!: EntidadeSimplificada[];
  public colunasGrid: string[] = ['codigo', 'nome', 'cnpj'];

  public isLoadingResults = false;
  public isRateLimitReached = false;

  constructor(
    public form: FormularioBuscaService,
    private service: EntidadesService,
    public dialogRef: MatDialogRef<LookupEntidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');
    this.listar();
  }

  public confirmar() {
    this.dialogRef.close(this.selecionado.value as EntidadeSimplificada);
  }

  private listar() {
    //filtra por status x tipo data = filtro
    const filtros = [{ key: 'status', value: 1 }];

    if (this.data === 'empresa')
      filtros.push({ key: 'tipo', value: 1 });

    this.isLoadingResults = true;

    this.service.listar(undefined, filtros).subscribe({
      next: result => {
        this.isLoadingResults = false;
        this.listaEntidades = result.lista;
      },
      error: () => {
        this.isRateLimitReached = true;
        this.isLoadingResults = false;
      }
    });
  }
}
