import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FormularioAtaService } from '../services/formulario-ata.service';
import { ItemDeAta, ItemDeReajuste } from 'src/app/core/types/item';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ModalItemAtaComponent } from './modal-item-ata/modal-item-ata.component';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { Reajuste } from 'src/app/core/types/documentos';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-ata',
  templateUrl: './ata.component.html',
  styleUrls: ['./ata.component.scss']
})
export class AtaComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {
  private id: number = 0;
  public possuiEmpenho = false;
  public status!: FormControl<number>;
  public listaItens!: FormControl<ItemDeAta[]>;
  public selecionado!: FormControl;

  constructor(
    public form: FormularioAtaService,
    private route: ActivatedRoute,
    private messageService: MensagemService,
    private dialog: MatDialog,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.form.limpar();
    this.status = this.form.obterControle<number>('status');
    this.listaItens = this.form.obterControle<ItemDeAta[]>('itens');
    this.selecionado = this.form.obterControle<ItemDeAta>('selecionadoGrid');

    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });

    if (this.id) this.setBoolEmpenho();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializarFormulario(this.id);
    });
  }

  private async setBoolEmpenho() {
    this.possuiEmpenho = await this.form.possuiEmpenho(this.id);
  }

  async salvar(preencher: boolean = true) {
    const control = this.form.obterControle('edital');

    if (!control.value) {
      return this.messageService.openSnackBar('numero do edital é obrigatório', 'alert');
    }
    this.mostrarSpinner();

    try {
      if (this.id && this.id != 0) {
        if (this.status.value === 2)
          this.messageService.openSnackBar('Documento está inativo', 'alert');
        else
          await this.metodoEditar();
      }
      else
        await this.metodoNovo();
    } catch {
      preencher = false;
    } finally {
      this.esconderSpinner();
      await this.inicializarFormulario(this.id, preencher);
    }
  }

  private async metodoNovo() {
    const result = await this.form.criar();

    if (result) {
      this.messageService.openSnackBar('ATA criada com sucesso!', 'success');
      this.id = result.id;
      this.form.idAta = result.id;
      this.listaItens.setValue(result.itens);
    }
  }
  private async metodoEditar() {
    const result = await this.form.editar();
    if (result) {
      this.form.idAta = this.id;
      this.messageService.openSnackBar('ATA editada com sucesso!', 'success');
    }
  }

  async abrirBaixa() {
    if (this.id && this.id !== 0) {
      const tipo = this.form.obterControle('unidade').value.id;
      if (!tipo) return this.messageService.openSnackBar('É preciso salvar a unidade para abrir a baixa', 'alert')
      await this.salvar(false);
      if (tipo === 3 || tipo === 9) {
        const queryParams = { ata: this.id };
        return this.router.navigate(['/licitacao/baixa/policia'], { queryParams });
      }
      const queryParams = { ata: this.id };
      return this.router.navigate(['/licitacao/baixa'], { queryParams });
    }
    return this.messageService.openSnackBar('É preciso salvar o documento para criar baixa', 'alert');
  }

  async inativar() {
    if (this.form.idAta === 0)
      return this.messageService.openSnackBar('Salve o documento antes de inativar', 'alert');

    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar ata?',
        item: `\nAs alterações NÃO salvas serão descartadas`
      }
    });

    const confirma = await lastValueFrom(confirmacao.afterClosed());
    if (confirma === true) {
      this.mostrarSpinner();

      try {
        await this.form.inativar();
        await this.inicializarFormulario(this.id);
      } finally {
        this.esconderSpinner();
      }
    }
  }

  async novoItem() {
    if (this.status.value === 2) return this.messageService.openSnackBar('Documento está inativo', 'alert');

    if (this.possuiEmpenho) return this.messageService.openSnackBar('Essa ata possui empenhos!', 'alert');
    const item = this.itemVazio();

    const result = await this.abreModalItem(item);

    if (result) {
      const novoItem: ItemDeAta = result;

      if (await this.validarDuplicado(novoItem)) {

        this.form.adicionarItem(novoItem);
      }
    }
  }

  async editarItem() {
    if (this.status.value === 2) return this.messageService.openSnackBar('Documento está inativo', 'alert');

    if (!this.selecionado.value) {
      return this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
    }
    const item: ItemDeAta = this.selecionado.value as ItemDeAta;

    const result = await this.abreModalItem(item);

    if (result) {
      const index = this.listaItens.value.indexOf(item);
      const edit: ItemDeAta = result

      if (await this.validarDuplicado(edit, index)) {
        this.form.editarItem(edit, index);
      }
    }
  }

  private async abreModalItem(item: ItemDeAta): Promise<ItemDeAta> {
    const dialogRef = this.dialog.open(ModalItemAtaComponent, {
      disableClose: true,
      data: item
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

  private itemDuplicado(item: ItemDeAta, index?: number): ItemDeAta | null {

    const lista = this.listaItens.value.filter(i => i.id === item.id);
    if (lista.length >= 1) {

      if (!index && index !== 0) return lista[0];

      if (this.listaItens.value[index] !== lista[0]) return lista[0];
    }

    return null;
  }
  private async validarDuplicado(item: ItemDeAta, index?: number) {
    const duplicado = this.itemDuplicado(item, index);

    if (duplicado) {
      this.messageService.openSnackBar('Não é possivel inserir um item duplicado', 'alert');
      return false;
    }
    return true;
  }
  excluirItem() {
    if (this.status.value === 2) return this.messageService.openSnackBar('Documento está inativo', 'alert');

    if (this.possuiEmpenho) return this.messageService.openSnackBar('Essa ata possui empenhos!', 'alert');
    const item = this.selecionado.value;

    if (!item) {
      return this.messageService.openSnackBar('Nenhum item selecionado', 'alert');
    }

    this.form.excluirItem(item);
  }

  cancelar() {
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
        this.router.navigate(['/licitacao/pesquisar']);
      }
    });
  }

  criarReajuste() {
    if (this.listaItens.value.length === 0)
      return this.messageService.openSnackBar('Não é possivel gerar historico sem itens', 'alert');

    if (this.status.value === 2)
      return this.messageService.openSnackBar('Não é possivel gerar historico de ata desativada', 'alert');

    const dataControl = this.form.obterControle<Date>('dataAta');

    if (!dataControl.value)
      return this.messageService.openSnackBar('Não é possivel gerar historico sem data da ata', 'alert');

    this.novoReajuste(dataControl.value);
  }

  novoReajuste(data: Date) {

    if (this.form.totalReajustes !== 0)
      data = new Date();

    const reajuste: Reajuste = {
      id: 0,
      ataID: this.form.idAta,
      data: data,
      itens: []
    }

    for (const item of this.listaItens.value) {
      const itemReajuste: ItemDeReajuste = {
        id: item.id,
        ataID: reajuste.ataID,
        reajusteId: reajuste.id,
        nome: item.nome,
        qtdeLicitada: item.qtdeLicitada,
        unidade: item.unidade,
        valorLicitado: item.valorLicitado,
        valorUnitario: item.valorUnitario
      }

      reajuste.itens.push(itemReajuste);
    }

    this.mostrarSpinner();
    this.form.retornaServiceHistorico(reajuste)
      .subscribe({
        next: () => {
          this.esconderSpinner();
          this.form.totalReajustes += 1;
          this.salvar();
        }, error: () => this.esconderSpinner()
      });
  }

  excluirReajuste(index: number) {
    const dataReajuste = new Date(this.form.reajustes[index].data);

    const dia = dataReajuste.getDate();
    const mes = dataReajuste.getMonth() + 1;
    const ano = dataReajuste.getFullYear();

    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Excluir do historico',
        mensagem: `Deseja excluir o reajuste ${dia}/${mes}/${ano} ?`,
        item: `\nAs alterações NÃO serão salvas`
      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        this.mostrarSpinner()
        this.form.retornaServiceExcluirHistorico(index)
          .subscribe({
            next: () => {
              this.esconderSpinner();
              this.form.totalReajustes -= 1;
              this.salvar();
            }, error: () => this.esconderSpinner()
          });
      }
    });
  }

  private itemVazio(): ItemDeAta {
    return {
      id: 0,
      ataID: this.form.idAta,
      nome: '',
      unidade: '',
      qtdeLicitada: 0,
      valorUnitario: 0,
      valorLicitado: 0,
      desconto: 0,
      duplicado: true
    }
  }

  public async inicializarFormulario(id: number, preencher: boolean = true) {

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
    const edital = this.form.obterControle<string>('edital');
    const responsavel = this.form.obterControle('responsavel');
    const empresa = this.form.obterControle('empresa');
    const orgao = this.form.obterControle('orgao');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const itens = this.form.obterControle<ItemDeAta[]>('itens');
    const status = this.form.obterControle<number>('status');

    const result = await this.form.obterAta(id);

    if (result) {
      this.form.idAta = result.id;
      this.form.totalReajustes = result.totalReajustes;

      edital.setValue(result.edital);
      responsavel.setValue(result.responsavel);
      status.setValue(result.status);
      dataLicitacao.setValue(result.dataLicitacao);
      dataAta.setValue(result.dataAta);
      vigencia.setValue(result.vigencia);
      itens.setValue(result.itens);

      if (result.empresa)
        empresa.setValue(await this.form.obterEntidade(result.empresa as any));

      if (result.orgao)
        orgao.setValue(await this.form.obterEntidade(result.orgao as any));

      if (result.unidade)
        this.form.setUnidadePorID(result.unidade);

      this.form.setAtaOriginal();

      await this.form.buscaHistorico();
    }

  }
}
