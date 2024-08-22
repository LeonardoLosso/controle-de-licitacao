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
  public usuarioCadastrado: boolean = false;

  public permissoes = new FormControl<Permissoes[]>([]);
  public username = new FormControl<string>('');
  public senha = new FormControl<string>('');
  public resenha = new FormControl<string>('');



  constructor(
    dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) data: Usuario,
    dialog: MatDialog,
    protected override service: UsuariosService,
    private mensagemService: MensagemService
  ) {
    super(dialogRef, data, dialog, service);

    this.configurarForm();
  }



  displayFnEstados(val: string): string {
    const value = EnumUF.filter(f => f.id === val)[0];
    return value && value.nome ? `${value.id} - ${value.nome}` : '';
  };

  habilitaBotao(): boolean {
    if (this.username.invalid)
      return true;

    if (this.usuarioCadastrado)
      return true;

    if (this.resenha.invalid)
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
      this.senha.setValidators(Validators.required);
      this.resenha.setValidators(Validators.required);
      this.resenha.addValidators(FormValidations.equalTo(this.senha));

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
    this.senha.valueChanges.subscribe(value => {
      if (this.edicao) {
        if (value) {
          this.resenha.setValidators(Validators.required)
          this.resenha.addValidators(FormValidations.equalTo(this.senha));
          this.resenha.reset()
        } else {
          this.resenha.clearValidators();
          this.resenha.reset
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
}
