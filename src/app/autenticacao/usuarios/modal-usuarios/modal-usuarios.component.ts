import { Component, Inject } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { EnumUF } from 'src/app/core/types/enum';
import { Permissoes, Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';
import { FormValidations } from 'src/app/shared/form-validations';
import { UsuariosService } from '../../services/usuarios.service';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';

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
    service: UsuariosService
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

  protected override submeterEdicao(): MudancasParaPatch[] {
    const mudancas: MudancasParaPatch[] = [];

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty && control.value !== control.pristine) {
        mudancas.push({ op: 'replace', path: `/${controlName}`, value: control.value });
      }
    }

    if (this.senha.value) {
      mudancas.push({ op: 'replace', path: `/password`, value: this.senha.value });
    }

    if (this.resenha.value) {
      mudancas.push({ op: 'replace', path: `/rePassword`, value: this.resenha.value });
    }

    if (this.permissoes.dirty) {
      for (let i = 0; i < this.cadastro.permissoes.length; i++) {
        const permissaoOriginal = this.data.permissoes[i];
        const permissaoNova = this.cadastro.permissoes[i];

        for (let j = 0; j < permissaoNova.recursos.length; j++) {
          const recursoOriginal = permissaoOriginal.recursos[j];
          const recursoNovo = permissaoNova.recursos[j];

          if (recursoNovo.permissaoRecurso !== recursoOriginal.permissaoRecurso) {
            mudancas.push({
              op: 'replace',
              path: `/permissoes/${i}/recursos/${j}/permissaoRecurso`,
              value: recursoNovo.permissaoRecurso
            });
          }
        }
      }
    }
    return mudancas;
  }

  protected override cancelar(form: NgForm) {
    super.cancelar(form, !this.permissoes.dirty);
  }
}
