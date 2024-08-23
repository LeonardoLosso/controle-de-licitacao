import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BuscaBaseDirective } from 'src/app/core/diretivas/busca-base.directive';
import { Item, ItemSimplificado } from 'src/app/core/types/item';
import { ItensService } from '../services/itens.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { FormularioBuscaService } from '../services/formulario-busca.service';

@Component({
  selector: 'app-busca-itens',
  templateUrl: './busca-itens.component.html',
  styleUrls: ['./busca-itens.component.scss']
})
export class BuscaItensComponent extends BuscaBaseDirective<Item, ItemSimplificado> {

  constructor(
    form: FormularioBuscaService,
    service: ItensService,
    dialog: MatDialog,
    router: Router,
    errorMessage: MensagemService
  ) {
    super(form, service, dialog, router, errorMessage);
  }

  protected override setModal(): void {
    this.modal = ModalItemComponent;
  }
  protected cadastroVazio(): Item {
    return {
      id: 0,
      status: 1,
      ehCesta: false,
      nome: '',
      unidadePrimaria: '',
      unidadeSecundaria: '',
      listaItens: [],
      listaNomes: []
    }
  }
}
