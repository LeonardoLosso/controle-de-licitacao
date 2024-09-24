import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { FormularioBaixaPoliciaService } from '../services/formulario-baixa-policia.service';
import { MatDialog } from '@angular/material/dialog';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { lastValueFrom } from 'rxjs';
import { EmpenhoPolicia, Nota, NotaSimplificada } from 'src/app/core/types/documentos';
import { ModalEmpenhoComponent } from './modal-empenho/modal-empenho.component';
import { ModalNotaComponent } from '../notas/modal-nota/modal-nota.component';

@Component({
  selector: 'app-baixa-policia',
  templateUrl: './baixa-policia.component.html',
  styleUrls: ['./baixa-policia.component.scss']
})
export class BaixaPoliciaComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {

  private id!: number;

  public aba!: FormControl;
  public status!: FormControl;

  public selecionado!: FormControl;
  public notaSelecionada!: FormControl;

  public listaNotas!: FormControl;
  public listaEmpenho!: FormControl;
  public label: 'Empenho' | 'Nota' = 'Empenho'


  constructor(
    public form: FormularioBaixaPoliciaService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.form.limpar();
    this.inicializaFormControl();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializaDados();
    })
  }
  onTabChange(index: number) {
    this.aba.setValue(index);
    if(this.aba.value ===0)
      this.notaSelecionada.setValue(null);
    else
      this.selecionado.setValue(null);
    this.label = this.aba.value === 0 ? 'Empenho' : 'Nota'
  }
  //------------------------------------------------------------------
  public cancelar() {
    const queryParams = { ata: this.id };
    this.router.navigate(['/licitacao'], { queryParams });
  }
  public async inativar() {
    if (!(await this.confirmarInativacao())) return;

    this.mostrarSpinner();

    try {
      if (await this.form.inativar()) {
        this.mensagemService.openSnackBar("Baixa inativada com sucesso!", 'success');

        await this.inicializarFormulario(this.id)
      }
    } finally {
      this.esconderSpinner();
    }
  }
  public async salvar() {
    this.mostrarSpinner();
    try {
      const result = await this.form.salvar();
      if (result) {
        this.form.idAta = this.id;
        this.mensagemService.openSnackBar('BAIXA editada com sucesso!', 'success');
      }
    }
    finally {
      this.esconderSpinner();
      await this.inicializarFormulario(this.id);
    }
  }
  public async editarEmpenho() {
    if (this.status.value === 2) return this.mensagemService.openSnackBar('Documento está inativo', 'alert');

    if (!this.selecionado.value) {
      return this.mensagemService.openSnackBar('Nenhum item selecionado', 'alert');
    }

    const empenho: EmpenhoPolicia = this.selecionado.value as EmpenhoPolicia;

    const result = await this.abreModalEmpenho(empenho);

    if (result) {
      const index = this.listaEmpenho.value.indexOf(empenho);
      const edit: EmpenhoPolicia = result;

      this.form.editarEmpenho(edit, index);
    }
  }
  public async novoEmpenho() {
    if (this.status.value === 2) return this.mensagemService.openSnackBar('Documento está inativo', 'alert');

    const empenho = this.empenhoVazio();

    const result = await this.abreModalEmpenho(empenho);

    if (result) {
      const novoItem: EmpenhoPolicia = result;

      this.form.adicionarEmpenho(novoItem);
    }
  }
  public excluirEmpenho() {
    if (this.status.value === 2) return this.mensagemService.openSnackBar('Documento está inativo', 'alert');

    const empenho = this.selecionado.value;

    if (!empenho) {
      return this.mensagemService.openSnackBar('Nenhum empenho selecionado', 'alert');
    }

    this.form.excluirEmpenho(empenho);
  }
  public async adicionarNota() {
    const novaNota: Nota = {
      id: 0,
      ehPolicia: true,
      observacao: '',
      numNota: '',
      empenhoID: -this.id,
      numEmpenho: '',
      baixaID: this.form.idAta,
      edital: this.form.obterControle('edital').value,
      unidade: this.form.obterControle('orgao').value,
      dataEmissao: new Date(),
      dataEntrega: new Date(),
      itens: []
    }
    const result = await this.abreModalNota(novaNota);
    if (result) {
      this.mensagemService.openSnackBar("Nota adicionada com sucesso!", 'success');
      this.inicializarFormulario(this.id);
    }
  }
  public async editarNota() {
    const select = this.notaSelecionada.value;
    this.mostrarSpinner()
    try {
      const nota = await this.form.obterNotaPorID(select.id);

      if (nota) {
        if(nota.unidade)
          nota.unidade = await this.form.obterEntidade(nota.unidade as any);
        
        nota.edital = this.form.obterControle('edital').value;
        nota.ehPolicia = true;

        const result = await this.abreModalNota(nota);
        if (result) {
          this.mensagemService.openSnackBar("Nota editada com sucesso!", 'success');
          this.inicializarFormulario(this.id);
        }
      }

    } finally {
      this.esconderSpinner();
    }
  }
  public async excluirNota() {
    const nota = this.notaSelecionada.value;

    if (!nota) return this.mensagemService.openSnackBar("Nenhuma nota selecionada", 'alert');

    if (!(await this.confirmarExclusao(nota))) return;

    this.mostrarSpinner();
    try {
      const result = await this.form.excluirNota(nota.id);
      if (result) {
        this.mensagemService.openSnackBar("Nota excluida com sucesso!", 'success');
        this.inicializaDados();
      }

    } finally {
      this.esconderSpinner();
    }
  }
  //-------------------------------------------------------------------
  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.notaSelecionada = this.form.obterControle('notaSelecionada');

    this.listaEmpenho = this.form.obterControle('empenhos');
    this.listaNotas = this.form.obterControle('notas');
    this.aba = this.form.obterControle('abaSelecionada');

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
    const responsavel = this.form.obterControle<string>('responsavel');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const empresa = this.form.obterControle('empresa');
    const orgao = this.form.obterControle('orgao');
    const notas = this.form.obterControle('notas');
    const empenhos = this.form.obterControle('empenhos');

    const result = await this.form.obterBaixaPorID(id);

    if (result) {
      this.form.idAta = result.id;
      edital.setValue(result.edital);
      responsavel.setValue(result.responsavel);
      status.setValue(result.status);
      dataLicitacao.setValue(result.dataLicitacao);
      dataAta.setValue(result.dataAta);
      vigencia.setValue(result.vigencia);

      if (result.empresa)
        empresa.setValue(await this.form.obterEntidade(result.empresa as any));

      if (result.orgao)
        orgao.setValue(await this.form.obterEntidade(result.orgao as any));

      if (result.unidade)
        this.form.setUnidadePorID(result.unidade);

      empenhos.setValue(result.empenhos);
      notas.setValue(await this.form.listarNotas(result.id));

      this.form.setEmpenhosOriginais();
      this.form.valorLicitado = result.valorLicitado ?? 0;
      this.form.valorEmpenhado = result.valorEmpenhado ?? 0;
      this.form.valorEntregue = result.valorEntregue ?? 0;
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
  private async confirmarExclusao(nota: Nota) {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Excluir',
        mensagem: 'Deseja excluir nota?',
        item: `${nota.numNota}`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }
  private empenhoVazio(): EmpenhoPolicia {
    return {
      baixaID: this.id,
      dataEmpenho: new Date(),
      edital: this.form.obterControle('edital').value,
      id: 0,
      numEmpenho: "",
      numNota: "",
      valor: 0
    }
  }
  private async abreModalEmpenho(empenho: EmpenhoPolicia): Promise<EmpenhoPolicia> {
    const dialogRef = this.dialog.open(ModalEmpenhoComponent, {
      disableClose: true,
      data: empenho
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }
  private async abreModalNota(documento: Nota): Promise<NotaSimplificada> {
    const dialogRef = this.dialog.open(ModalNotaComponent, {
      disableClose: true,
      data: documento
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

}
