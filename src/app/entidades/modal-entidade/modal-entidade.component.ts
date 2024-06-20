import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Entidade } from 'src/app/core/types/entidade';
import { EnumTipoCadastro, EnumUF } from 'src/app/core/types/enum';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
    selector: 'app-modal-entidade',
    templateUrl: './modal-entidade.component.html',
    styleUrls: ['./modal-entidade.component.scss']
})
export class ModalEntidadeComponent {
    public entidade!: Entidade;
    public options = EnumTipoCadastro;
    public estados = EnumUF;
    public titulo = "Novo Cadastro";

    constructor(
        public dialogRef: MatDialogRef<ModalEntidadeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Entidade,
        private dialog: MatDialog

    ) {
        this.entidade = { ...data };

        if (data.id !== 0) {
            this.titulo = "Editar Cadastro"
        }

    }


    displayFn(val: number): string {
        const value =  EnumTipoCadastro.filter(f => f.id === val)[0];
        return value && value.nome ? `${value.nome}` : '';
    };

    displayFnEstados(val: string): string {
        const value =  EnumUF.filter(f => f.id === val)[0]; 
        return value && value.nome ? `${value.id} - ${value.nome}` : '';
    };

    cancelar(form: NgForm) {
        if (!form.dirty) {
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
}
