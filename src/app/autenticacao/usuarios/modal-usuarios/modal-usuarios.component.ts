import { Component, Inject } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { EnumUF } from 'src/app/core/types/enum';
import { Permissoes, Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';
import { FormValidations } from 'src/app/shared/form-validations';
import { UsuariosService } from '../../services/usuarios.service';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';
import { compare } from 'fast-json-patch';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.scss']
})
export class ModalUsuariosComponent extends ModalCrudDirective<Usuario, UsuarioSimplificado> {
  public override permissao: number = 602;

  public timeout: any;

  public estados = EnumUF;

  public permissoes = new FormControl<Permissoes[]>([]);
  public username = new FormControl<string>('');
  public password = new FormControl<string>('');
  public rePassword = new FormControl<string>('');



  constructor(
    dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) data: Usuario,
    dialog: MatDialog,
    protected override service: UsuariosService,
    private mensagemService: MensagemService
  ) {
    super(dialogRef, data, dialog, service);

    this.configurarForm();

    this.password.valueChanges.subscribe(value => this.cadastro.password = value ?? '');
    this.rePassword.valueChanges.subscribe(value => this.cadastro.rePassword = value ?? '');
  }

  protected override acaoNovo(): void {
    if (this.validaSubmit()) {
      this.esconderSpinner();
      return this.mensagemService.openSnackBar('Formulario preenchido incorretamente', 'alert');
    }

    this.cadastro.userName = this.username.value ?? '';
    super.acaoNovo();
  }

  displayFnEstados(val: string): string {
    const value = EnumUF.filter(f => f.id === val)[0];
    return value && value.nome ? `${value.id} - ${value.nome}` : '';
  };

  validaSubmit(): boolean {
    if (this.username.invalid)
      return true;

    if (!this.validaUserName())
      return true;

    if (this.rePassword.invalid)
      return true;

    if (this.botaoDesabilitado)
      return true;

    return false;
  }

  verificaCadastro() {
    this.username.markAsDirty();
    this.username.markAsTouched();
  }

  private configurarForm() {
    this.username.setValue(this.cadastro.userName);
    this.username.setValidators(Validators.required);

    if (!this.edicao) {
      this.password.setValidators(Validators.required);
      this.rePassword.setValidators(Validators.required);
      this.rePassword.addValidators(FormValidations.equalTo(this.password));

      this.username.addValidators(FormValidations.noWhitespaceValidator());
      this.username.addAsyncValidators(FormValidations.uniqueUsernameValidator(this.service as UsuariosService));

    } else {
      this.username.disable();
    }

    this.permissoes.setValue(this.cadastro.permissoes);
    this.permissoes.valueChanges.subscribe(value => {
      if (value) {
        this.cadastro.permissoes = value
      }
    })
    this.password.valueChanges.subscribe(value => {
      if (this.edicao) {
        if (value) {
          this.rePassword.setValidators(Validators.required)
          this.rePassword.addValidators(FormValidations.equalTo(this.password));
          this.rePassword.reset()
        } else {
          this.rePassword.clearValidators();
          this.rePassword.reset
        }
      }
    });
  }

  consultaCEP(ev: any) {
    const cep = ev.target.value.replace(/-/g, "");
    if (cep !== "" && this.data.endereco.cep !== cep) {
      this.service.getConsultaCep(cep)
        .subscribe({
          next: dados => {
            this.preencheEndereco(dados);
          },
          error: () => {
            this.mensagemService.openSnackBar('CEP não encontrado!', 'error')
          }
        });
    }
  }
  preencheEndereco(dados: any) {
    this.cadastro.endereco.logradouro = dados.logradouro ?? this.cadastro.endereco.logradouro;
    this.cadastro.endereco.bairro = dados.bairro ?? this.cadastro.endereco.bairro;
    this.cadastro.endereco.uf = dados.uf;
    this.cadastro.endereco.cidade = dados.localidade;
  }
  protected override cancelar(form: NgForm) {
    super.cancelar(form, !this.permissoes.dirty);
  }

  protected override editar(): any {
    const patch = compare(this.data, this.cadastro);
    if (patch)
      return patch;
    return null;
  }

  private validaUserName(): boolean {
    if (this.edicao)
      return true;

    return this.username.valid
  }
}
