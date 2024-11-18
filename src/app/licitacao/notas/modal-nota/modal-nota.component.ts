import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { compare } from 'fast-json-patch';
import { lastValueFrom } from 'rxjs';

import { Nota, NotaSimplificada } from 'src/app/core/types/documentos';
import { NotasService } from '../../services/notas.service';
import { ItemDeNota } from 'src/app/core/types/item';
import { LookupItemNotaComponent } from '../lookup-item-nota/lookup-item-nota.component';
import { ModalCrudDirective } from 'src/app/core/diretivas/modal-crud.directive';
import { MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { LookupEntidadesComponent } from 'src/app/entidades/lookup-entidades/lookup-entidades.component';
import { ModalObservacaoComponent } from './modal-observacao/modal-observacao.component';

@Component({
  selector: 'app-modal-nota',
  templateUrl: './modal-nota.component.html',
  styleUrls: ['./modal-nota.component.scss']
})
export class ModalNotaComponent extends ModalCrudDirective<Nota, NotaSimplificada> implements AfterViewInit {
  @ViewChild('elementFocus') elementFocus!: ElementRef;
  public override permissao: number = 502;

  public unidadeControl = new FormControl();
  public listaItens!: ItemDeNota[];
  public listaControl = new FormControl<ItemDeNota[]>([]);
  public selecionado = new FormControl<ItemDeNota | null>(null);
  public policia: boolean = false;
  public lookupDeEntidades = LookupEntidadesComponent;

  constructor(
    dialogRef: MatDialogRef<ModalNotaComponent>,
    @Inject(MAT_DIALOG_DATA) data: Nota,
    dialog: MatDialog,
    service: NotasService,
    private messageService: MensagemService
  ) {
    super(dialogRef, data, dialog, service);

    this.policia = this.cadastro.ehPolicia ?? false;
    if (this.cadastro.unidade) {
      this.unidadeControl.setValue(`${this.cadastro.unidade.id} - ${this.cadastro.unidade.fantasia}`);

      this.cadastro.unidade = this.cadastro.unidade.id as any;
    }

    this.listaItens = this.cadastro.itens;
    this.listaControl.setValue(this.listaItens);

    this.listaControl.valueChanges.subscribe(value => {
      this.cadastro.itens = value as ItemDeNota[];
    })
    if (this.edicao) {
      this.titulo += ' ' + this.data.numNota;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.elementFocus.nativeElement.focus();
    });
  }

  public async print() {
    if (!this.edicao)
      return

    const result = await lastValueFrom(this.service.print(this.cadastro.id));

    if (result) {
      const fileURL = URL.createObjectURL(result);

      window.open(fileURL, '_blank');
    }
  }

  public async modalObs() {
    const observacao = await this.abreModalObs(this.cadastro.observacao);

    this.cadastro.observacao = observacao;
  }

  protected override acaoNovo(): void {
    this.cadastro.itens = this.cadastro.itens.map(item => {
      return {
        ...item,
        quantidade: item.quantidade ?? 0,
        valorCaixa: item.valorCaixa ?? 0,
        qtdeCaixa: item.qtdeCaixa ?? 0
      }
    });
    super.acaoNovo();
  }

  public async addItem() {
    const itemVazio: ItemDeNota = {
      id: 0,
      nome: '',
      empenhoID: this.cadastro.empenhoID,
      notaID: this.cadastro.id,
      quantidade: null,
      unidade: '',
      valorTotal: 0,
      valorCaixa: null,
      qtdeCaixa: null,
      valorUnitario: 0
    };
    const novoItem = await this.abreModalItem(itemVazio);
    if (novoItem) {

      if (!await this.validarDuplicado(novoItem))
        return this.messageService.openSnackBar('Item duplicado!', 'alert');

      this.listaItens = this.listaItens ?? [];

      this.listaItens.push(novoItem);
      this.listaItens = [...this.listaItens.sort((a, b) => a.nome.localeCompare(b.nome))];
      this.listaControl.setValue(this.listaItens);
      this.listaControl.markAsDirty();

      this.messageService.openSnackBar('Item adicionado', 'success');
    }
  }

  public removerItem() {
    const item = this.selecionado.value;

    if (!item) {
      return this.messageService.openSnackBar('Nenhum item selecionado');
    }

    if (this.listaItens) {
      this.listaItens = [...this.listaItens.filter(i => i.id !== item.id)];
      this.listaControl.setValue(this.listaItens);
      this.listaControl.markAsDirty();
    }
  }
  protected override editar(): MudancasParaPatch[] {
    if (this.cadastro.empenhoID < 0)
      this.cadastro.unidade = this.unidadeControl.value.id ?? this.data.unidade;

    const patch = compare(this.data, this.cadastro)

    return patch;
  }

  private async abreModalItem(item: ItemDeNota): Promise<ItemDeNota> {
    const dialogRef = this.dialog.open(LookupItemNotaComponent, {
      disableClose: true,
      data: {
        item: item,
        policia: this.policia
      }
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

  private async abreModalObs(obs: string): Promise<string> {
    const dialogRef = this.dialog.open(ModalObservacaoComponent, {
      data: { observacoes: obs }
    });

    return await lastValueFrom(dialogRef.afterClosed());
  }

  private async validarDuplicado(item: ItemDeNota, index?: number) {
    const duplicado = this.itemDuplicado(item, index);

    if (duplicado)
      return false;

    return true;
  }

  private itemDuplicado(item: ItemDeNota, index?: number): ItemDeNota | null {

    const lista = this.listaItens.filter(i => i.id === item.id);
    if (lista.length >= 1) {

      if (!index && index != 0) return lista[0];

      if (this.listaItens[index] !== lista[0]) return lista[0];
    }

    return null;
  }
}
