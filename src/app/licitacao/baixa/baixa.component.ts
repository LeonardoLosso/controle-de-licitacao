import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

import { FormularioBaixaService } from '../services/formulario-baixa.service';
import { ItemDeBaixa } from 'src/app/core/types/item';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { EmpenhoSimplificado } from 'src/app/core/types/documentos';

@Component({
  selector: 'app-baixa',
  templateUrl: './baixa.component.html',
  styleUrls: ['./baixa.component.scss']
})
export class BaixaComponent implements OnInit {
  private id!: string;

  public status!: FormControl;
  public selecionado!: FormControl;
  public listaItens!: FormControl;
  public listaEmpenho!: FormControl;

  constructor(
    private form: FormularioBaixaService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.inicializaFormControl();

    this.inicializaDados();
  }

  public salvar() { }
  public inativar() { }
  public novoEmpenho() { } //cria novo response e joga para tela de empenho
  public editarEmpenho() { }//abrir tela de empenho
  public excluirEmpenho() { } //lógica inativar/reativar/excluir
  public importarEmpenho() { }//importação + redirecionamento com novo id

  public cancelar() {
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
        this.location.back();
      }
    });
  }
  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeBaixa[]>('itens');
    this.listaEmpenho = this.form.obterControle<EmpenhoSimplificado[]>('empenhos');
    this.selecionado = this.form.obterControle<ItemDeBaixa>('selecionadoGrid');
  }
  private inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });

    this.form.inicializarFormulario(this.id);
  }
}
