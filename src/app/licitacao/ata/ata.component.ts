import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
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

  public status!: FormControl<number>;
  public listaItens!: FormControl<ItemDeAta[]>;
  public selecionado!: FormControl;

  constructor(
    public form: FormularioAtaService,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MensagemService,
    private dialog: MatDialog,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.status = this.form.obterControle<number>('status');
    this.listaItens = this.form.obterControle<ItemDeAta[]>('itens');
    this.selecionado = this.form.obterControle<ItemDeAta>('selecionadoGrid');

    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializarFormulario(this.id);
    })
  }

  async salvar(preencher: boolean = true) {
    const control = this.form.obterControle('edital');

    if (!control.valid) {
      return this.messageService.openSnackBar('numero do edital é obrigatório', 'alert');
    }
    this.mostrarSpinner();

    this.form.totalLicitado = this.listaItens.value?.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);

    try {
      if (this.id && this.id != 0)
        await this.metodoEditar();
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

      await this.criarBaixa();
    }
  }
  private async metodoEditar() {
    const result = await this.form.editar();
    if (result) {
      this.form.idAta = this.id;
      this.messageService.openSnackBar('ATA editada com sucesso!', 'success');

      await this.editarBaixa();
    }
  }

  private async criarBaixa() {
    const result = await this.form.criarBaixa();

    if (result)
      this.messageService.openSnackBar('BAIXA criada com sucesso!', 'success');
  }

  private async editarBaixa() {
    const result = await this.form.editarBaixa();

    if (result)
      this.messageService.openSnackBar('BAIXA editada com sucesso!', 'success');
  }


  async abrirBaixa() {
    if (this.id && this.id !== 0) {
      await this.salvar(false);
      const queryParams = { ata: this.id };
      return this.router.navigate(['/licitacao/baixa'], { queryParams });
    }
    return this.messageService.openSnackBar('É preciso salvar o documento para criar baixa', 'alert');
  }

  inativar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar ata?',
        item: `\nAs alterações NÃO salvas serão descartadas`
      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.form.idAta === 0)
          return this.messageService.openSnackBar('Salve o documento antes de inativar', 'alert');

        this.mostrarSpinner();

        this.form.inativar().subscribe({
          next: () => {
            if (this.status.value === 2) {
              this.status.setValue(1);
            } else {
              this.status.setValue(2);
            }
            this.esconderSpinner();
          }, error: () => this.esconderSpinner()
        });
      }
    });

  }

  async novoItem() {
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

  private trataDuplicado(item: ItemDeAta, duplicado: ItemDeAta) {
    item.quantidade += duplicado.quantidade;
    item.valorTotal = item.valorUnitario * item.quantidade;
    this.form.excluirItem(duplicado);
  }
  private itemDuplicado(item: ItemDeAta, index?: number): ItemDeAta | null {

    const lista = this.listaItens.value.filter(i => i.id === item.id && i.valorUnitario === item.valorUnitario);
    if (lista.length >= 1) {

      if (!index && index !==0) return lista[0];

      if (this.listaItens.value[index] !== lista[0]) return lista[0];
    }

    return null;
  }
  private async validarDuplicado(item: ItemDeAta, index?: number) {
    const duplicado = this.itemDuplicado(item, index);

    if (duplicado) {
      if (!(await this.confirmaDuplicado())) return false;

      this.trataDuplicado(item, duplicado);
    }
    return true;
  }
  private async confirmaDuplicado(): Promise<boolean> {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Item Duplicado',
        mensagem: 'Deseja prosseguir mesmo asim?',
        item: `\nCaso confirme o item será agrupado com o item já existente`
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }
  excluirItem() {
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
        this.location.back();
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
        quantidade: item.quantidade,
        unidade: item.unidade,
        valorTotal: item.valorTotal,
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
      quantidade: 0,
      valorUnitario: 0,
      valorTotal: 0,
      desconto: 0,
      duplicado: true
    }
  }

  public inicializarFormulario(id: number, preencher: boolean = true) {

    this.form.limpar();

    if (id && id !== 0 && preencher) {
      this.mostrarSpinner();
      this.preencher(id);
    }

  }

  private preencher(id: number) {
    const status = this.form.obterControle<number>('status');
    const edital = this.form.obterControle<string>('edital');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const itens = this.form.obterControle<ItemDeAta[]>('itens');

    const observable = this.form.retornaServiceObter(id);

    observable.subscribe({
      next: result => {
        this.form.idAta = result.id;
        this.form.totalLicitado = result.totalLicitado;
        this.form.totalReajustes = result.totalReajustes;
        edital.setValue(result.edital);
        status.setValue(result.status);
        dataLicitacao.setValue(result.dataLicitacao);
        dataAta.setValue(result.dataAta);
        vigencia.setValue(result.vigencia);
        itens.setValue(result.itens);
        this.form.setAtaOriginal();
        if (result.empresa) {
          const idObjeto: any = result.empresa;
          this.form.setEmpresaPorID(idObjeto);
        }
        if (result.orgao) {
          const idObjeto: any = result.orgao;
          this.form.setOrgaoPorID(idObjeto);
        }
        if (result.unidade) {
          this.form.setUnidadePorID(result.unidade);
        }
        this.form.buscaHistorico();

        this.esconderSpinner();
      }, error: () => this.esconderSpinner()
    });
  }
}
