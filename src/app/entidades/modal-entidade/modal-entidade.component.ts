import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';
import { EnumTipoCadastro, EnumUF } from 'src/app/core/types/enum';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';
import { EntidadesService } from '../services/entidades.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { compare } from 'fast-json-patch';

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
        protected override service: EntidadesService,
        private mensagemService: MensagemService
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

    protected override editar(): any {
        const patch = compare(this.data, this.cadastro);
        if(patch)
            return patch;
        return null;
    }
}
