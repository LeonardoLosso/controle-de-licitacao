import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { FormularioEmpenhoService } from '../services/formulario-empenho.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho } from 'src/app/core/types/item';
import { Notas } from 'src/app/core/types/documentos';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ModalItemEmpenhoComponent } from './modal-item-empenho/modal-item-empenho.component';

@Component({
  selector: 'app-empenho',
  templateUrl: './empenho.component.html',
  styleUrls: ['./empenho.component.scss']
})
export class EmpenhoComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {

  private id!: number;
  private aba!: FormControl;

  public status!: FormControl;
  public selecionado!: FormControl;
  public documentoSelecionado!: FormControl;
  public listaItens!: FormControl<ItemDeEmpenho[]>;
  public listaDocumentos!: FormControl;
  public label: 'Item' | 'Nota' = 'Item'


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
  onTabChange(index: number) {
    this.aba.setValue(index);
    this.label = this.aba.value === 0? 'Item' : 'Nota'
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
    } catch (ex) {
      debugger
    }
    finally {
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
      await this.inicializarFormulario(this.id)
    }
  }

  public async adicionar() {
    const item = this.itemVazio();

    const result = await this.abreModalItem(item);

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

    const result = await this.abreModalItem(item);

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

  public adicionarNota(){

  }

  public excluirNota(){

  }
  public editarNota(){
    
  }
  //----------------------------------------------
  private async confirmarInativacao() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar empenho?',
        item: `\nOs valores e quantidades não entregues serão recalculados`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }

  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    this.listaDocumentos = this.form.obterControle<Notas[]>('documentos');
    this.selecionado = this.form.obterControle<Notas>('selecionadoGrid');
    this.documentoSelecionado = this.form.obterControle<ItemDeEmpenho>('documentoSelecionado');
    this.aba = this.form.obterControle<ItemDeEmpenho>('abaSelecionada');

  }

  private async inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['empenho'];
    });
    await this.inicializarFormulario(this.id);
  }

  private async abreModalItem(item: ItemDeEmpenho): Promise<ItemDeEmpenho> {
    const dialogRef = this.dialog.open(ModalItemEmpenhoComponent, {
      disableClose: true,
      data: item
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
      qtdeEmpenhada: 0,
      qtdeEntregue: 0,
      total: 0,
      valorEntregue: 0,
      itemDeBaixa: false,
      valorUnitario: 0
    }
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
    const valor = this.form.obterControle<Date>('valor');
    const unidade = this.form.obterControle('unidade');
    const orgao = this.form.obterControle('orgao');
    const itens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    const documentos = this.form.obterControle<Notas[]>('documentos');

    const result = await this.form.obterEmpenho(id);

    if (result) {
      this.form.idAta = result.baixaID;

      idEmpenho.setValue(result.id);
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

    const lista = this.listaItens.value.filter(i => i.id === item.id && i.valorUnitario === item.valorUnitario);
    if (lista.length >= 1) {

      if (!index && index != 0) return lista[0];

      if (this.listaItens.value[index] !== lista[0]) return lista[0];
    }

    return null;
  }
}
