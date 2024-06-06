import { Component } from '@angular/core';
import { BuscaBaseDirective } from 'src/app/core/diretivas/busca-base.directive';
import { Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';
import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
  selector: 'app-busca-usuarios',
  templateUrl: './busca-usuarios.component.html',
  styleUrls: ['./busca-usuarios.component.scss']
})
export class BuscaUsuariosComponent extends BuscaBaseDirective<Usuario, UsuarioSimplificado> {

  protected override initForm(): void {
  }

  constructor(
    form: FormularioBuscaService,
    service: UsuariosService,
    dialog: MatDialog,
    router: Router,
    errorMessage: MensagemService
  ) {
    super(form, service, dialog, router, errorMessage);
  }

  protected override dialogCadastro(cadastro: Usuario, novo: boolean): void {
    const dialogRef = this.dialog.open(ModalUsuariosComponent, {
      width: '45%',
      data: cadastro,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (novo) {
        // logicado novo
      } else {
        // logica do editar
      }
    });
  }

  protected override cadastroVazio(): Usuario {
    throw new Error('Method not implemented.');
  }
}
