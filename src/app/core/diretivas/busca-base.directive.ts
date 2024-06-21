import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MensagemService } from '../services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { MensagemModal } from '../types/auxiliares';
import { FormularioBuscaBaseService } from '../services/formulario-busca-base.service';
import { CrudBaseService } from '../services/crud-base.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[appBuscaBase]'
})
export abstract class BuscaBaseDirective<Objeto, ObjetoSimplificado> implements OnInit {

  public lista!: ObjetoSimplificado[];
  public selecionado!: FormControl;
  public pesquisa!: FormControl;
  public totalItems!: number;
  public pagina: number = 1;
  public isLoadingResults = true;
  public isRateLimitReached = false;

  constructor(
    public form: FormularioBuscaBaseService,
    protected service: CrudBaseService<Objeto, ObjetoSimplificado>,
    protected dialog: MatDialog,
    protected router: Router,
    protected messageService: MensagemService
  ) {

    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');

    this.pesquisa.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe((value) => {
        this.limpar();
        this.loadData(value);
      })
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  protected abstract initForm(): void;

  protected abstract cadastroVazio(): Objeto;
  protected abstract dialogCadastro(cadastro: Objeto, novo: boolean): void;

  public criar(): void {
    const cadastro = this.cadastroVazio();
    this.dialogCadastro(cadastro, true);
  };
  public editar(): void {
    const id = this.selecionado.value?.id;
    let cadastro;
    if (!id) {
      return this.messageService.openSnackBar('Nenhum cadastro selecionado');
    }
    this.service.obterPorID(id).subscribe({
      next: result => {
        cadastro = result

        this.dialogCadastro(cadastro, false);
      }
    });

  };

  public voltar(): void {
    this.router.navigate(['/']);
  };

  protected mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    const nome = item.nome?? item.fantasia ?? undefined;
    return {
      titulo: 'Inativar cadastro?',
      mensagem: 'Deseja inativar a cadastro??',
      item: `\nCód: ${item.id} - ${nome}`
    }
  }
  public buscar(): void {

    this.loadData();
  }
  public mudarPagina(value: number) {
    this.pagina = value + 1;
    this.pesquisa.setValue('');
    this.loadData();
  }
  public limpar(): void {
    this.form.limparFiltros();
  }

  public inativar() {
    const cadastro = this.selecionado.value;

    if (!cadastro) {
      return this.messageService.openSnackBar('Nenhum cadastro selecionado');
    }

    this.inativarConfirmar(cadastro);
  }

  public loadData(search?: string) {
    const params = search ? [{ key: 'search', value: search }] : this.form.obterDadosBusca();

    this.isLoadingResults = true;

    this.service.listar(this.pagina, params).subscribe({
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

  private inativarCadastro(cadastro: ObjetoSimplificado) {
    this.service.inativar(cadastro).subscribe({
      next: () => {
        this.loadData();
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
}
