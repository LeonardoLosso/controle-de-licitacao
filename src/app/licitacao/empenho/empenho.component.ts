import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { FormularioEmpenhoService } from '../services/formulario-empenho.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho } from 'src/app/core/types/item';
import { Nota, NotaSimplificada } from 'src/app/core/types/documentos';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ModalItemEmpenhoComponent } from './modal-item-empenho/modal-item-empenho.component';
import { ModalNotaComponent } from '../notas/modal-nota/modal-nota.component';
import { DocumentosDirective } from 'src/app/core/diretivas/documentos.directive';
import { ModalControllService } from 'src/app/core/services/modal-controll.service';

@Component({
  selector: 'app-empenho',
  templateUrl: './empenho.component.html',
  styleUrls: ['./empenho.component.scss']
})
export class EmpenhoComponent extends DocumentosDirective implements OnInit, AfterViewInit {

  private id!: number;

  public status!: FormControl;
  public selecionado!: FormControl;
  public documentoSelecionado!: FormControl;
  public listaItens!: FormControl<ItemDeEmpenho[]>;
  public listaDocumentos!: FormControl<NotaSimplificada[]>;
  public label: 'Item' | 'Nota' = 'Item'
  public possuiPermissao = true;

  constructor(
    private form: FormularioEmpenhoService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private router: Router,
    modalControlService: ModalControllService
  ) { super(modalControlService) }

  ngOnInit(): void {
    this.inicializaFormControl();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializaDados();
    })
  }
  onTabChange(index: number) {
    this.aba.setValue(index);
    if (this.aba.value === 0)
      this.documentoSelecionado.setValue(null);
    else
      this.selecionado.setValue(null);

    this.label = this.aba.value === 0 ? 'Item' : 'Nota'
  }
  //-------------------[Botões]-------------------
  protected override async cancelar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Cancelar',
        mensagem: 'Deseja cancelar?',
        item: `\nAs alterações NÃO serão salvas`
      }
    });

    const result = await lastValueFrom(confirmacao.afterClosed());

    if (result === true) {
      const queryParams = { ata: this.form.idAta };
      this.router.navigate(['/licitacao/baixa'], { queryParams });
    }
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
    if (this.status.value && this.status.value !== 2)
      if (!(await this.confirmarInativacao())) return;

    this.mostrarSpinner();

    try {
      if (await this.form.inativar()) {
        this.aba.setValue(0);
        if (this.status.value === 2) {
          this.status.setValue(1);
        } else {
          this.status.setValue(2);
        }
        this.mensagemService.openSnackBar("Empenho inativado com sucesso!", 'success');
      }
    } finally {
      this.esconderSpinner();
      await this.inicializarFormulario(this.id)
    }
  }

  public async adicionar() {
    const item = this.itemVazio();

    const result = await this.abreModal(item, 'item');

    if (result) {
      const novoItem: ItemDeEmpenho = result;
      if (!await this.validarDuplicado(novoItem))
        return this.mensagemService.openSnackBar('Item duplicado!', 'alert');

      this.form.adicionarItem(novoItem);
    }
  }

  public async editar() {
    if (!this.selecionado.value) {
      return this.mensagemService.openSnackBar('Nenhum item selecionado', 'alert');
    }
    const item: ItemDeEmpenho = this.selecionado.value as ItemDeEmpenho;

    const result = await this.abreModal(item, 'item');

    if (result) {
      const index = this.listaItens.value.indexOf(item);
      const edit: ItemDeEmpenho = result

      if (!await this.validarDuplicado(edit, index))
        return this.mensagemService.openSnackBar('Item duplicado!', 'alert');

      await this.form.editarItem(edit, index);
    }
  }

  public excluir() {
    const item = this.selecionado.value;

    if (!item) {
      return this.mensagemService.openSnackBar('Nenhum item selecionado', 'alert');
    }

    this.form.excluirItem(item);
  }

  public async adicionarNota() {
    const novaNota: Nota = {
      id: 0,
      ehPolicia: false,
      observacao: '',
      numNota: '',
      empenhoID: this.id,
      numEmpenho: this.form.obterControle('numEmpenho').value,
      baixaID: this.form.idAta,
      edital: this.form.obterControle('edital').value,
      unidade: this.form.obterControle('unidade').value,
      dataEmissao: new Date(),
      dataEntrega: new Date(),
      itens: []
    }
    const result = await this.abreModal(novaNota, 'nota');
    if (result) {
      this.mensagemService.openSnackBar("Nota adicionada com sucesso!", 'success');
      this.inicializarFormulario(this.id);
    }
  }

  public async excluirNota() {
    const nota = this.documentoSelecionado.value;

    if (!nota) return this.mensagemService.openSnackBar("Nenhuma nota selecionada", 'alert');

    if (!(await this.confirmarExclusao(nota))) return;

    this.mostrarSpinner()
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

  public async editarNota() {
    const select = this.documentoSelecionado.value;

    if (!select) return this.mensagemService.openSnackBar("Nenhuma nota selecionada", 'alert');

    this.mostrarSpinner()
    try {
      const nota = await this.form.obterNotaPorID(select.id);

      if (nota) {
        nota.unidade = this.form.obterControle('unidade').value;
        nota.numEmpenho = this.form.obterControle('numEmpenho').value;
        const result = await this.abreModal(nota, 'nota');
        if (result) {
          this.mensagemService.openSnackBar("Nota editada com sucesso!", 'success');
          this.inicializarFormulario(this.id);
        }
      }

    } finally {
      this.esconderSpinner();
    }
  }
  //----------------------------------------------

  private async confirmarInativacao() {
    this.modalControlService.openModal()

    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar empenho?',
        item: `\nOs valores e quantidades não entregues serão recalculados`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed()).finally(() => this.modalControlService.closeModal());
  }
  private async confirmarExclusao(nota: NotaSimplificada) {
    this.modalControlService.openModal()

    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Excluir',
        mensagem: 'Deseja excluir nota?',
        item: `${nota.numNota} - ${nota.numEmpenho}`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed()).finally(() => this.modalControlService.closeModal());
  }

  private inicializaFormControl() {
    this.form.limpar();

    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    this.listaDocumentos = this.form.obterControle<Nota[]>('documentos');
    this.selecionado = this.form.obterControle<Nota>('selecionadoGrid');
    this.documentoSelecionado = this.form.obterControle<ItemDeEmpenho>('documentoSelecionado');
    this.aba = this.form.obterControle('abaSelecionada');

  }

  private async inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['empenho'];
    });
    await this.inicializarFormulario(this.id);
  }

  private async abreModal(item: ItemDeEmpenho | Nota, tipo: 'item' | 'nota') {
    this.modalControlService.openModal()
    let result!: any;
    if (tipo === 'item')
      result = await this.abreModalItem(item as ItemDeEmpenho);
    else
      result = await this.abreModalNota(item as Nota);

    this.modalControlService.closeModal();

    return result;
  }

  private async abreModalItem(item: ItemDeEmpenho): Promise<ItemDeEmpenho> {

    const dialogRef = this.dialog.open(ModalItemEmpenhoComponent, {
      disableClose: true,
      data: item
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

  private async abreModalNota(documento: Nota): Promise<NotaSimplificada> {
    const dialogRef = this.dialog.open(ModalNotaComponent, {
      width: '60%',
      disableClose: true,
      data: documento
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

  private itemVazio(): ItemDeEmpenho {
    return {
      id: 0,
      baixaID: this.form.idAta,
      empenhoId: this.id,
      nome: '',
      unidade: '',
      qtdeAEntregar: 0,
      qtdeEmpenhada: null,
      qtdeEntregue: 0,
      total: 0,
      valorEntregue: 0,
      itemDeBaixa: false,
      valorUnitario: null
    }
  }

  private async inicializarFormulario(id?: number, preencher: boolean = true) {
    this.form.limpar();
    if (id && id !== 0 && preencher) {
      this.mostrarSpinner();
      try {
        await this.preencher(id);
        const documentos = this.form.obterControle<Nota[]>('documentos');
        documentos.setValue(await this.form.obterNotas(id));
      }
      catch (ex) {
        if (ex instanceof (Error))
          if (ex.cause === 401 && ex.message.includes('nota'))
            this.possuiPermissao = false;
      }
      finally {
        this.esconderSpinner();
      }
    }
  }

  private async preencher(id: number) {
    const idEmpenho = this.form.obterControle<string>('idEmpenho');
    const edital = this.form.obterControle<string>('edital');
    const numEmpenho = this.form.obterControle<string>('numEmpenho');
    const status = this.form.obterControle<number>('status');
    const data = this.form.obterControle<Date>('data');
    const valor = this.form.obterControle<Date>('valor');
    const unidade = this.form.obterControle('unidade');
    const orgao = this.form.obterControle('orgao');
    const itens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    const result = await this.form.obterEmpenho(id);

    if (result) {
      this.form.idAta = result.baixaID;

      idEmpenho.setValue(result.id);
      numEmpenho.setValue(result.numEmpenho);
      edital.setValue(result.edital);
      status.setValue(result.status);
      data.setValue(result.dataEmpenho);
      itens.setValue(result.itens);
      valor.setValue(result.valor);

      if (result.unidade)
        unidade.setValue(await this.form.obterEntidade(result.unidade as any));

      if (result.orgao)
        orgao.setValue(await this.form.obterEntidade(result.orgao as any));

      this.form.setEmpenhoOriginal();
    }
  }

  private async validarDuplicado(item: ItemDeEmpenho, index?: number) {
    const duplicado = this.itemDuplicado(item, index);

    if (duplicado)
      return false;

    return true;
  }

  private itemDuplicado(item: ItemDeEmpenho, index?: number): ItemDeEmpenho | null {

    const lista = this.listaItens.value.filter(i => i.id === item.id);
    if (lista.length >= 1) {

      if (!index && index != 0) return lista[0];

      if (this.listaItens.value[index] !== lista[0]) return lista[0];
    }

    return null;
  }

  protected override acaoAdd(): void {
    if (this.aba.value !== 1) {
      this.adicionar();
    } else this.adicionarNota();
  }

  protected override acaoDelete(): void {
    if (this.aba.value !== 1) {
      this.excluir();
    } else this.excluirNota();
  }
}
