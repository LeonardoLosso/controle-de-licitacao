import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AtaLicitacaoSimplificada } from 'src/app/core/types/documentos';
import { FormularioPesquisaService } from '../services/formulario-pesquisa.service';
import { DocumentosService } from '../services/documentos.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { MensagemModal } from 'src/app/core/types/auxiliares';
import { CrudPesquisaBaseDirective } from 'src/app/core/diretivas/crud-pesquisa-base.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent extends CrudPesquisaBaseDirective<AtaLicitacaoSimplificada> {

  constructor(
    form: FormularioPesquisaService,
    private service: DocumentosService,
    dialog: MatDialog,
    router: Router,
    messageService: MensagemService
  ) { super(form, dialog, router, messageService) }

  public criar(): void {
    this.router.navigate(['/licitacao']);
  };
  
  protected override acaoEditar(id: number): void {
    const queryParams = { ata: id };
    this.router.navigate(['/licitacao'], { queryParams });
  }

  protected override mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    return {
      titulo: 'Inativar documento?',
      mensagem: 'Deseja inativar a cadastro??',
      item: `\nCód: ${item.id} - ${item.nome}`
    }
  }

  protected override serviceInativar(cadastro: AtaLicitacaoSimplificada): Observable<any> {
    return this.service.inativar(cadastro);
  }

  protected override serviceListar(params: {key: string, value: any}[]): Observable<any> {
    return this.service.listar(this.pagina, params);
  }
}
