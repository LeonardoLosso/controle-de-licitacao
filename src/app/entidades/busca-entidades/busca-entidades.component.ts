import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';
import { ModalEntidadeComponent } from '../modal-entidade/modal-entidade.component';
import { FormularioBuscaService } from '../services/formulario-busca.service';
import { EntidadesService } from '../services/entidades.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
    selector: 'app-busca-entidades',
    templateUrl: './busca-entidades.component.html',
    styleUrls: ['./busca-entidades.component.scss']
})
export class BuscaEntidadesComponent implements OnInit {
    public listaEntidades!: EntidadeSimplificada[];
    public selecionado!: FormControl;
    public pesquisa!: FormControl;

    constructor(
        public form: FormularioBuscaService,
        private service: EntidadesService,
        private dialog: MatDialog,
        private router: Router,
        private errorMessage: MensagemService
    ) { }


    ngOnInit(): void {
        this.selecionado = this.form.obterControle('selecionadoGrid');
        this.pesquisa = this.form.obterControle('pesquisa');

        this.service.listar().subscribe({
            next: result => {
                this.listaEntidades = result;
            }
        });
    }

    buscar() {
        //nova query a partir do form
    }

    limpar() {
        this.form.limparFiltros();
    }

    voltar() {
        this.router.navigate(['/']);
    }

    inativar() {
        const entidade = this.selecionado.value;

        if (!entidade) {
            return this.errorMessage.openSnackBar('Nenhum item selecionado');
        }

        this.inativarConfirmar(entidade);
    }

    editar() {
        const entidade = this.selecionado.value;

        if (!entidade) {
            return this.errorMessage.openSnackBar('Nenhum item selecionado');
        }
        //REALIZAR QUERY

        this.abrirDialog(this.selecionado.value);
    }

    criar() {
        const entidade = this.entidadeVazia();

        this.abrirDialog(entidade);
    }

    private inativarConfirmar(entidade: EntidadeSimplificada) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            disableClose: true,
            data: {
                titulo: 'Inativar entidade',
                mensagem: 'Deseja inativar a entidade?',
                item: `\nCód: ${entidade.ID} - ${entidade.Fantasia}`
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const id = entidade.ID;
                // logica para inativação
            }
        });
    }

    private abrirDialog(entidade: Entidade) {

        const dialogRef = this.dialog.open(ModalEntidadeComponent, {
            width: '54%',
            data: entidade,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            //retornar na query / salvar / atualizar item da grid
        });
    }

    private entidadeVazia(): Entidade {
        return {
            ID: 0,
            Status: 1,
            Nome: '',
            Fantasia: '',
            Tipo: 0,
            CNPJ: '',
            IE: '',
            Telefone: '',
            Email: '',
            Endereco: {
                CEP: '',
                Cidade: '',
                UF: '',
                Bairro: '',
                Logradouro: '',
                Numero: '',
                Complemento: ''
            }
        }
    }
}
