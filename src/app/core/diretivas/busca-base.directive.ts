import { Directive, Type } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, Observable } from 'rxjs';

import { MensagemService } from '../services/mensagem.service';
import { MensagemModal } from '../types/auxiliares';
import { FormularioBuscaBaseService } from '../services/formulario-busca-base.service';
import { CrudBaseService } from '../services/crud-base.service';
import { CrudPesquisaBaseDirective } from './crud-pesquisa-base.directive';

@Directive({})
export abstract class BuscaBaseDirective<Objeto, ObjetoSimplificado> extends CrudPesquisaBaseDirective<ObjetoSimplificado> {

  public isModalOpen = false;
  protected modal!: Type<any>
  constructor(
    form: FormularioBuscaBaseService,
    protected service: CrudBaseService<Objeto, ObjetoSimplificado>,
    dialog: MatDialog,
    router: Router,
    messageService: MensagemService
  ) {
    super(form, dialog, router, messageService)
    this.setModal();
  }

  protected abstract cadastroVazio(): Objeto;
  protected abstract setModal(): void;

  public override async criar() {
    const cadastro = this.cadastroVazio();
    try {
      this.isModalOpen = true;
      const dialog = await this.dialogCadastro(cadastro);
      if (dialog) {
        this.loadData();
        this.messageService.openSnackBar('Criado com sucesso!', 'success');
      }
    } finally {
      this.esconderSpinner();
      this.isModalOpen = false;
    }
  };

  protected override async acaoEditar(id: number) {
    this.mostrarSpinner();
    this.isModalOpen = true;
    try {
      const result = await lastValueFrom(this.service.obterPorID(id));
      if (result) {
        const dialog = await this.dialogCadastro(result);
        if (dialog) {
          this.loadData();
          this.messageService.openSnackBar('Editado com sucesso!', 'success');
        }
      }
    } finally {
      this.esconderSpinner();
      this.isModalOpen = false;
    }
  }

  protected override mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    const nome = item.nome ?? item.fantasia ?? undefined;
    const msg = item?.status === 1 ? 'Inativar' : 'Reativar';
    return {
      titulo: `${msg} cadastro?`,
      mensagem: `Deseja ${msg} o cadastro??`,
      item: `\nCód: ${item.id} - ${nome}`
    }
  }

  protected override serviceInativar(cadastro: ObjetoSimplificado): Observable<any> {
    return this.service.inativar(cadastro);
  }

  protected override serviceListar(params: { key: string, value: any }[]): Observable<any> {
    return this.service.listar(this.pagina, params);
  }
  private async dialogCadastro(cadastro: Objeto) {
    const dialogRef = this.dialog.open(this.modal, {
      width: '54%',
      data: cadastro,
      disableClose: true
    });
    return await lastValueFrom(dialogRef.afterClosed());
  }
}
