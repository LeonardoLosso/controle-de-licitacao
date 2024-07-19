import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';

import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { FormularioEmpenhoService } from '../services/formulario-empenho.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho } from 'src/app/core/types/item';
import { Notas } from 'src/app/core/types/documentos';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-empenho',
  templateUrl: './empenho.component.html',
  styleUrls: ['./empenho.component.scss']
})
export class EmpenhoComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {

  private id!: number;

  public status!: FormControl;
  public selecionado!: FormControl;
  public itemSelecionado!: FormControl;
  public listaItens!: FormControl;
  public listaDocumentos!: FormControl;


  constructor(
    private form: FormularioEmpenhoService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.inicializaFormControl();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializaDados();
    })
  }
  //-------------------[Botões]-------------------
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

  public async salvar(preencher: boolean = true) {
    
    this.mostrarSpinner();
    try {
      const result = await this.form.editar();

      if (result) {
        this.mensagemService.openSnackBar('Empenho editado com sucesso!', 'success');
      }
    } finally {
      this.esconderSpinner();
      await this.inicializarFormulario(this.id, preencher)
    }
  }

  public async inativar() {
    if (!(await this.confirmarInativacao())) return;

    this.mostrarSpinner();

    try {
      if (await this.form.inativar()) {
        if (this.status.value === 2) {
          this.status.setValue(1);
        } else {
          this.status.setValue(2);
        }
        this.mensagemService.openSnackBar("Empenho inativado com sucesso!", 'success');
      }
    } finally {
      this.esconderSpinner();
    }
  }

  public adicionar() {

  }

  public excluir() {

  }

  public editar() {

  }
  //----------------------------------------------
  private async confirmarInativacao() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar empenho?',
        item: `\nAs alterações NÃO salvas serão descartadas`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }

  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    this.listaDocumentos = this.form.obterControle<Notas[]>('documentos');
    this.selecionado = this.form.obterControle<Notas>('selecionadoGrid');
    this.itemSelecionado = this.form.obterControle<ItemDeEmpenho>('itemSelecionadoGrid');
  }

  private async inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['empenho'];
    });
    await this.inicializarFormulario(this.id);
  }

  private async inicializarFormulario(id?: number, preencher: boolean = true) {
    this.form.limpar();
    if (id && id !== 0 && preencher) {
      this.mostrarSpinner();
      try {
        await this.preencher(id);
      }
      finally {
        this.esconderSpinner();
      }
    }
  }

  private async preencher(id: number) {
    const idEmpenho = this.form.obterControle<string>('idEmpenho');
    const edital = this.form.obterControle<string>('edital');
    const status = this.form.obterControle<number>('status');
    const data = this.form.obterControle<Date>('data');
    const unidade = this.form.obterControle('unidade');
    const orgao = this.form.obterControle('orgao');
    const itens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    const documentos = this.form.obterControle<Notas[]>('documentos');

    const result = await this.form.ObterEmpenho(id);

    if (result) {
      this.form.idAta = result.baixaId;
      idEmpenho.setValue(result.id);
      edital.setValue(result.edital);
      status.setValue(result.status);
      data.setValue(result.dataEmpenho);
      itens.setValue(result.itens);

      unidade.setValue(await this.form.ObterEntidade(result.unidade as any));
      orgao.setValue(await this.form.ObterEntidade(result.orgao as any));

      this.form.setEmpenhoOriginal();
    }
  }
}
