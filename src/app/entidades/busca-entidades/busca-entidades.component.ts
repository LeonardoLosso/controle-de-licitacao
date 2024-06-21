import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';
import { ModalEntidadeComponent } from '../modal-entidade/modal-entidade.component';
import { FormularioBuscaService } from '../services/formulario-busca.service';
import { EntidadesService } from '../services/entidades.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { BuscaBaseDirective } from 'src/app/core/diretivas/busca-base.directive';
import { MudancasParaPatch } from 'src/app/core/types/auxiliares';

@Component({
    selector: 'app-busca-entidades',
    templateUrl: './busca-entidades.component.html',
    styleUrls: ['./busca-entidades.component.scss']
})
export class BuscaEntidadesComponent extends BuscaBaseDirective<Entidade, EntidadeSimplificada> implements OnInit {
    protected initForm(): void {

    }

    constructor(
        form: FormularioBuscaService,
        service: EntidadesService,
        dialog: MatDialog,
        router: Router,
        errorMessage: MensagemService
    ) {
        super(form, service, dialog, router, errorMessage);
    }


    protected dialogCadastro(cadastro: Entidade, novo: boolean): void {
        const dialogRef = this.dialog.open(ModalEntidadeComponent, {
            width: '54%',
            data: cadastro,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (novo) {
                    this.service.criar(result).subscribe({
                        next: () => {
                            this.loadData()
                            this.messageService.openSnackBar('Cadastro editado com sucesso!', 'success');
                        }
                    });
                } else {
                    const mudancas = result as MudancasParaPatch[];
                    if (mudancas.length > 0) {
                        this.service.editar(result, cadastro.id).subscribe({
                            next: () => {
                                this.loadData()
                                this.messageService.openSnackBar('Cadastro editado com sucesso!', 'success');
                            }
                        });
                    }
                }
            }
        });
    }

    protected cadastroVazio(): Entidade {
        return {
            id: 0,
            status: 1,
            nome: '',
            fantasia: '',
            tipo: 0,
            cnpj: '',
            ie: '',
            telefone: '',
            email: '',
            endereco: {
                cep: '',
                cidade: '',
                uf: '',
                bairro: '',
                logradouro: '',
                numero: '',
                complemento: ''
            }
        }
    }
}
