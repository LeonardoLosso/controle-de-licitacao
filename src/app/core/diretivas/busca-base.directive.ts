import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MensagemService } from '../services/mensagem.service';
import { MensagemModal } from '../types/auxiliares';
import { FormularioBuscaBaseService } from '../services/formulario-busca-base.service';
import { CrudBaseService } from '../services/crud-base.service';
import { CrudPesquisaBaseDirective } from './crud-pesquisa-base.directive';
import { Observable } from 'rxjs';

@Directive({})
export abstract class BuscaBaseDirective<Objeto, ObjetoSimplificado> extends CrudPesquisaBaseDirective<ObjetoSimplificado> {

  constructor(
    form: FormularioBuscaBaseService,
    protected service: CrudBaseService<Objeto, ObjetoSimplificado>,
    dialog: MatDialog,
    router: Router,
    messageService: MensagemService
  ) { super(form, dialog, router, messageService) }

  protected abstract cadastroVazio(): Objeto;
  protected abstract dialogCadastro(cadastro: Objeto, novo: boolean): void;

  public override criar(): void {
    const cadastro = this.cadastroVazio();
    this.dialogCadastro(cadastro, true);
  };

  protected override acaoEditar(id: number): void {
    this.mostrarSpinner();
    this.service.obterPorID(id).subscribe({
      next: result => {
        this.esconderSpinner();
        this.dialogCadastro(result, false);
      }, error: () => this.esconderSpinner(),
    });
  }

  protected override mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    const nome = item.nome ?? item.fantasia ?? undefined;
    const msg = item?.status === 1 ? 'Inativar' : 'Reativar';
    return {
      titulo: `${msg} cadastro?`,
      mensagem: `Deseja ${msg} a cadastro??`,
      item: `\nCód: ${item.id} - ${nome}`
    }
  }

  protected override serviceInativar(cadastro: ObjetoSimplificado): Observable<any> {
    return this.service.inativar(cadastro);
  }

  protected override serviceListar(params: { key: string, value: any }[]): Observable<any> {
    return this.service.listar(this.pagina, params);
  }
}
