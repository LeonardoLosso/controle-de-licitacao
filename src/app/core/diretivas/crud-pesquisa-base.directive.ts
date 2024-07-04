import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

import { MensagemService } from '../services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { MensagemModal } from '../types/auxiliares';
import { FormularioBuscaBaseService } from '../services/formulario-busca-base.service';
import { SpinnerControlDirective } from './spinner-control.directive';

@Directive({})
export abstract class CrudPesquisaBaseDirective<ObjetoSimplificado> extends SpinnerControlDirective implements OnInit {

  public lista!: ObjetoSimplificado[];
  public pagina: number = 1;
  public totalItems!: number;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public selecionado!: FormControl;
  public pesquisa!: FormControl;

  constructor(
    public form: FormularioBuscaBaseService,
    protected dialog: MatDialog,
    protected router: Router,
    protected messageService: MensagemService
  ) { super() }

  ngOnInit(): void {
    this.loadData();

    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');

    this.pesquisa.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe((value) => {
        this.limpar();
        this.loadData(value);
      })
  }

  public abstract criar(): void;
  protected abstract mensagemInativacao(): MensagemModal
  protected abstract acaoEditar(id: number): void
  protected abstract serviceInativar(cadastro: ObjetoSimplificado): Observable<any>
  protected abstract serviceListar(params: { key: string, value: any }[]): Observable<any>

  public editar(): void {
    const id = this.selecionado.value?.id;
    if (!id) {
      return this.messageService.openSnackBar('Nenhum cadastro selecionado', 'alert');
    }
    this.acaoEditar(id);
  }

  public limpar(): void {
    this.form.limparFiltros();
  }

  public mudarPagina(value: number): void {
    this.pagina = value + 1;
    this.pesquisa.setValue('');
    this.loadData();
  }

  public buscar(): void {

    this.loadData();
  }

  public voltar(): void {
    this.router.navigate(['/']);
  }

  public inativar() {
    const cadastro = this.selecionado.value;

    if (!cadastro) {
      return this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
    }

    this.inativarConfirmar(cadastro);
  }

  public loadData(search?: string) {
    const params = search ? [{ key: 'search', value: search }] : this.form.obterDadosBusca();

    this.isLoadingResults = true;

    this.serviceListar(params)
      .subscribe({
        next: result => {
          this.isLoadingResults = false;
          this.lista = result.lista;
          this.totalItems = result.totalItems;
        },
        error: () => {
          this.isRateLimitReached = true;
          this.isLoadingResults = false;
        }
      });
  }

  private inativarConfirmar(cadastro: ObjetoSimplificado) {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: this.mensagemInativacao()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inativarCadastro(cadastro);
      }
    });
  }

  private inativarCadastro(cadastro: ObjetoSimplificado) {
    this.mostrarSpinner();
    this.serviceInativar(cadastro)
      .subscribe({
        next: () => {
          this.loadData();
          this.esconderSpinner();
          this.selecionado.setValue(null);
          this.messageService.openSnackBar('Status atualizado com sucesso!', 'success');
        }, error: () => this.esconderSpinner()
      });;
  }
}
