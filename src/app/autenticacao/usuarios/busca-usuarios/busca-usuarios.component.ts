import { Component, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BuscaBaseDirective } from 'src/app/core/diretivas/busca-base.directive';
import { Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';
import { ModalUsuariosComponent } from '../modal-usuarios/modal-usuarios.component';
import { FormularioBuscaService } from '../../services/formulario-busca.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
  selector: 'app-busca-usuarios',
  templateUrl: './busca-usuarios.component.html',
  styleUrls: ['./busca-usuarios.component.scss']
})
export class BuscaUsuariosComponent extends BuscaBaseDirective<Usuario, UsuarioSimplificado> {

  constructor(
    form: FormularioBuscaService,
    service: UsuariosService,
    dialog: MatDialog,
    router: Router,
    errorMessage: MensagemService
  ) {
    super(form, service, dialog, router, errorMessage);

  }
  protected override setModal(): void {
    this.modal = ModalUsuariosComponent
  }
  protected override cadastroVazio(): Usuario {
    return {
      id: 0,
      password: '',
      nome: '',
      rePassword: '',
      userName: '',
      cpf: '',
      email: '',
      telefone: '',
      permissoes: [],
      status: 1,
      endereco: {
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        logradouro: '',
        numero: '',
        uf: ''
      }
    }
  }
}
