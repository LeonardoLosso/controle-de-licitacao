import { Directive, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MensagemService } from '../services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { MensagemModal } from '../types/auxiliares';
import { FormularioBuscaBaseService } from '../services/formulario-busca-base.service';
import { CrudBaseService } from '../services/crud-base.service';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appBuscaBase]'
})
export abstract class BuscaBaseDirective<Objeto, ObjetoSimplificado> implements OnInit {

  public lista!: ObjetoSimplificado[];
  public selecionado!: FormControl;
  public pesquisa!: FormControl;

  constructor(
    public form: FormularioBuscaBaseService,
    protected service: CrudBaseService<Objeto, ObjetoSimplificado>,
    protected dialog: MatDialog,
    protected router: Router,
    protected errorMessage: MensagemService
  ) { }

  ngOnInit(): void {
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');

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
    const cadastro = this.selecionado.value;
    // const ID = this.selecionado.value;
    // const cadastro = this.service.obterPorID(id).subscribe();
    if (!cadastro) {
      return this.errorMessage.openSnackBar('Nenhum cadastro selecionado');
    }

    this.dialogCadastro(cadastro, false);
  };

  public voltar(): void {
    this.router.navigate(['/']);
  };

  protected mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    return {
        titulo: 'Inativar cadastro?',
        mensagem: 'Deseja inativar a cadastro??',
        item: `\nCód: ${item.ID} - ${item.Nome}`
    }
}
  public listar(): void {
    this.service.listar().subscribe({
      next: result => {
        this.lista = result;
      }
    });
  }

  public limpar(): void {
    this.form.limparFiltros();
  }

  public inativar() {
    const cadastro = this.selecionado.value;

    if (!cadastro) {
      return this.errorMessage.openSnackBar('Nenhum cadastro selecionado');
    }

    this.inativarConfirmar(cadastro);
  }

  private loadData() {
    this.service.listar().subscribe({
      next: result => {
        this.lista = result;
      }
    });
  }

  private inativarCadastro() {
    const id = this.selecionado.value.ID;
    this.service.inativar(id);
  }

  private inativarConfirmar(cadastro: ObjetoSimplificado) {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: this.mensagemInativacao()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inativarCadastro();
        // this.loadData() Se sucesso
      }
    });
  }

}
