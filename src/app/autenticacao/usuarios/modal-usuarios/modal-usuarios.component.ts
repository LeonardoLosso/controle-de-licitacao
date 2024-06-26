import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { EnumUF } from 'src/app/core/types/enum';
import { Permissoes, Usuario } from 'src/app/core/types/usuarios';
import { FormValidations } from 'src/app/shared/form-validations';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.scss']
})
export class ModalUsuariosComponent {

  @ViewChild('form') form!: NgForm;
  timeout: any;

  public usuario!: Usuario;
  public usuarioOriginal!: Usuario;

  public titulo = "Novo Cadastro";
  public estados = EnumUF;
  public edicao = false;
  public usuarioCadastrado: boolean = false;

  public permissoes = new FormControl<Permissoes[]>([]);
  public username = new FormControl<string>('');
  public senha = new FormControl<string>('');
  public resenha = new FormControl<string>('');



  constructor(
    public dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog,
    private service: UsuariosService
  ) {
    this.usuario = { ...data };

    if (data.id !== 0) {
      this.titulo = "Editar Cadastro"
      this.edicao = true;
      this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));

    }
    this.configurarForm();
  }

  submeter() {
    if (this.senha.valid && this.username.valid && this.resenha.valid) {
      if (this.data.id !== 0) {
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
          for (let i = 0; i < this.usuario.permissoes.length; i++) {
            const permissaoOriginal = this.usuarioOriginal.permissoes[i];
            const permissaoNova = this.usuario.permissoes[i];

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
        return this.dialogRef.close(mudancas);
      }

      this.usuario.userName = this.username.value ?? '';
      this.usuario.password = this.senha.value ?? '';
      this.usuario.rePassword = this.resenha.value ?? '';

      return this.dialogRef.close(this.usuario);
    }
  }


  displayFnEstados(val: string): string {
    const value = EnumUF.filter(f => f.id === val)[0];
    return value && value.nome ? `${value.id} - ${value.nome}` : '';
  };

  cancelar(form: NgForm) {
    if (!form.dirty && !this.permissoes.dirty) {
      return this.dialogRef.close();
    }
    this.confirmarCancelar();
  }

  private confirmarCancelar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Cancelar',
        mensagem: 'Deseja cancelar?',
        item: `\nAs alterações NÃO serão salvas`
      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close();
      }
    });
  }
  habilitaBotao(): boolean {
    if (this.username.invalid)
      return true;

    if(this.usuarioCadastrado)
      return true;
    
    if (this.resenha.invalid)
      return true;

    return false;
  }
  verificaCadastro(){
    this.username.markAsDirty();
    this.username.markAsTouched();
  }
  private configurarForm() {
    this.username.setValue(this.usuario.userName);
    this.username.setValidators(Validators.required);

    if (!this.edicao) {
      this.senha.setValidators(Validators.required);
      this.resenha.setValidators(Validators.required);
      this.resenha.addValidators(FormValidations.equalTo(this.senha));

      this.username.addAsyncValidators(FormValidations.uniqueUsernameValidator(this.service));
      
    } else {
      this.username.disable();
    }

    this.permissoes.setValue(this.usuario.permissoes);
    this.permissoes.valueChanges.subscribe(value => {
      if (value) {
        this.usuario.permissoes = value
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
}
