import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';
import { MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { EnumTipoCadastro, EnumUF } from 'src/app/core/types/enum';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';
import { EntidadesService } from '../services/entidades.service';

@Component({
    selector: 'app-modal-entidade',
    templateUrl: './modal-entidade.component.html',
    styleUrls: ['./modal-entidade.component.scss']
})
export class ModalEntidadeComponent extends ModalCrudDirective<Entidade, EntidadeSimplificada> {
    public override permissao: number = 102;

    public options = EnumTipoCadastro;
    public estados = EnumUF;

    constructor(
        dialogRef: MatDialogRef<ModalEntidadeComponent>,
        @Inject(MAT_DIALOG_DATA) data: Entidade,
        dialog: MatDialog,
        service: EntidadesService
    ) {
        super(dialogRef, data, dialog, service);
    }

    displayFn(val: number): string {
        const value = EnumTipoCadastro.filter(f => f.id === val)[0];
        return value && value.nome ? `${value.nome}` : '';
    };

    displayFnEstados(val: string): string {
        const value = EnumUF.filter(f => f.id === val)[0];
        return value && value.nome ? `${value.id} - ${value.nome}` : '';
    };
}
