import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { FormularioBaixaService } from '../services/formulario-baixa.service';
import { ItemDeBaixa } from 'src/app/core/types/item';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { EmpenhoSimplificado } from 'src/app/core/types/documentos';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
  selector: 'app-baixa',
  templateUrl: './baixa.component.html',
  styleUrls: ['./baixa.component.scss']
})
export class BaixaComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {
  private id!: number;

  public status!: FormControl;
  public selecionado!: FormControl;
  public listaItens!: FormControl;
  public listaEmpenho!: FormControl;

  constructor(
    private form: FormularioBaixaService,
    private dialog: MatDialog,
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

  public async novoEmpenho() {
    this.mostrarSpinner();
    try {
      const result = await this.form.novoEmpenho();
      if (result) {
        this.mensagemService.openSnackBar("Empenho criado com sucesso!", 'success');
        this.goToEdit(result.id);
      }
    } finally {
      this.esconderSpinner();
    }
  }
  public editarEmpenho() {
    const empenho = this.selecionado.value;

    if (!empenho) return this.mensagemService.openSnackBar("Nenhum empenho selecionado", 'alert');

    this.goToEdit(empenho.id);
  }
  public async excluirEmpenho() {
    const empenho = this.selecionado.value;

    if (!empenho) return this.mensagemService.openSnackBar("Nenhum empenho selecionado", 'alert');

    if (!(await this.confirmarExclusao(empenho))) return;

    this.mostrarSpinner()
    try {
      const result = await this.form.excluirEmpenho(empenho.id);
      if (result) {
        this.mensagemService.openSnackBar("Empenho excluido com sucesso!", 'success');
        this.inicializaDados();
      }

    } finally {
      this.esconderSpinner();
    }
  }
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
        const queryParams = { ata: this.id };
        this.router.navigate(['/licitacao'], { queryParams });
      }
    });
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
        this.mensagemService.openSnackBar("Baixa inativada com sucesso!", 'success');
      }
    } finally {
      this.esconderSpinner();
    }
  }

  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeBaixa[]>('itens');
    this.listaEmpenho = this.form.obterControle<EmpenhoSimplificado[]>('empenhos');
    this.selecionado = this.form.obterControle<ItemDeBaixa>('selecionadoGrid');
  }
  private async inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });

    await this.inicializarFormulario(this.id);
  }

  private async inicializarFormulario(id?: number) {

    this.form.limpar();
    if (id && id !== 0) {
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
    const status = this.form.obterControle<number>('status');
    const edital = this.form.obterControle<string>('edital');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const empresa = this.form.obterControle('empresa');
    const orgao = this.form.obterControle('orgao');
    const itens = this.form.obterControle<ItemDeBaixa[]>('itens');
    const empenhos = this.form.obterControle<EmpenhoSimplificado[]>('empenhos');

    const result = await this.form.obterBaixaPorID(id);

    if (result) {
      this.form.idAta = result.id;
      edital.setValue(result.edital);
      status.setValue(result.status);
      dataLicitacao.setValue(result.dataLicitacao);
      dataAta.setValue(result.dataAta);
      vigencia.setValue(result.vigencia);
      itens.setValue(result.itens);

      if (result.empresa)
        empresa.setValue(await this.form.obterEntidade(result.empresa as any));

      if (result.orgao)
        orgao.setValue(await this.form.obterEntidade(result.orgao as any));

      empenhos.setValue(await this.form.listarEmpenhos(result.id));
      if (empenhos.value) {
        for (var empenho of empenhos.value as EmpenhoSimplificado[]) {
          if (empenho.orgao)
            empenho.orgao = await this.form.obterEntidade(empenho.orgao as any);

          if (empenho.unidade)
            empenho.unidade = await this.form.obterEntidade(empenho.unidade as any);
        }
      }
    }
  }

  private async confirmarInativacao() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar baixa?',
        item: `\nAs alterações NÃO salvas serão descartadas`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }

  private async confirmarExclusao(empenho: EmpenhoSimplificado) {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Excluir',
        mensagem: 'Deseja excluir empenho?',
        item: `${empenho.id} - ${empenho.edital}`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }

  private goToEdit(id: number) {
    const queryParams = { empenho: id };
    return this.router.navigate(['/licitacao/empenho'], { queryParams });
  }
}
