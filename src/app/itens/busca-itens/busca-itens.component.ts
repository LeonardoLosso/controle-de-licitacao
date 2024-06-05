import { Component } from '@angular/core';

import { BuscaBaseDirective } from 'src/app/core/diretivas/busca-base.directive';
import { Item, ItemSimplificado } from 'src/app/core/types/item';
import { ItensService } from '../services/itens.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { FormularioBuscaService } from '../services/formulario-busca.service';

@Component({
  selector: 'app-busca-itens',
  templateUrl: './busca-itens.component.html',
  styleUrls: ['./busca-itens.component.scss']
})
export class BuscaItensComponent extends BuscaBaseDirective<Item, ItemSimplificado> {

  protected initForm(): void {

  }

  constructor(
    form: FormularioBuscaService,
    service: ItensService,
    dialog: MatDialog,
    router: Router,
    errorMessage: MensagemService
  ) {
    super(form, service, dialog, router, errorMessage);
  }

  protected override dialogCadastro(cadastro: Item, novo: boolean): void {
    const dialogRef = this.dialog.open(ModalItemComponent, {
      width: '54%',
      data: cadastro,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (novo) {
        // logicado novo
      } else {
        // logica do editar
      }
    });
  }
  protected cadastroVazio(): Item {
    return {
      ID: 0,
      Status: 1,
      Nome: '',
      UnidadePrimaria: '',
      UnidadeSecundaria: '',
    }
  }
}
