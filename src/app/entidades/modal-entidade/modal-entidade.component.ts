import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Entidade } from 'src/app/core/types/entidade';
import { EnumTipoCadastro, EnumUF } from 'src/app/core/types/enum';

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
        @Inject(MAT_DIALOG_DATA) public data: Entidade
    ) {
        this.entidade = { ...data };
        
        if (data.ID !== 0) {
            this.titulo = "Editar Cadastro"
        }

    }


    displayFn = (id: number): string => {
        const option = this.options.find(option => option.id === id);
        return option ? `${option.id} - ${option.nome}` : '';
    };

    displayFnEstados = (id: string): string => {
        const estado = this.estados.find(estado => estado.id === id);
        return estado ? `${estado.id} - ${estado.nome}` : '';
    };

    cancelar() {
        this.dialogRef.close();
    }
}
