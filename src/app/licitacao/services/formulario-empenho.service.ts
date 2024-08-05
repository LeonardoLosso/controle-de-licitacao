import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { compare } from 'fast-json-patch';

import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { DocumentosService } from './documentos.service';
import { Empenho } from 'src/app/core/types/documentos';
import { ItemDeEmpenho } from 'src/app/core/types/item';

@Injectable({
  providedIn: 'root'
})
export class FormularioEmpenhoService {

  public formulario!: FormGroup;
  public idAta!: number;
  public empenhoOriginal!: Empenho;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      idEmpenho: new FormControl(0),
      numEmpenho: new FormControl(''),
      edital: new FormControl(null),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      documentoSelecionado: new FormControl(null),
      abaSelecionada: new FormControl(0),
      orgao: new FormControl(null),
      unidade: new FormControl(null),
      itens: new FormControl([]),
      documentos: new FormControl([]),
      data: new FormControl(null),
      valor: new FormControl(0)
    });
    this.desabilitarFormulario();

    const status = this.obterControle('status');
    status.valueChanges.subscribe(() => {
      this.desabilitarFormulario();
    })
  }

  public limpar() {
    this.idAta = 0;
    this.formulario.reset();
  }
  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }
  public setEmpenhoOriginal() {
    const empenho = this.retornaEmpenho();
    this.empenhoOriginal = JSON.parse(JSON.stringify(empenho));
  }
  public adicionarItem(item: ItemDeEmpenho) {
    const lista = this.obterControle('itens') as FormControl<ItemDeEmpenho[]>;
    const novaLista = [...lista.value];
    novaLista.push(item);
    lista.setValue(novaLista);
  }
  public editarItem(item: ItemDeEmpenho, index: number) {

    if (index < 0) return;

    const itemOriginal = this.obterControle('itens').value[index] as ItemDeEmpenho;

    itemOriginal.id = item.id;
    itemOriginal.nome = item.nome;
    itemOriginal.unidade = item.unidade;

    itemOriginal.qtdeAEntregar = item.qtdeAEntregar - item.qtdeEntregue;
    itemOriginal.qtdeEmpenhada = item.qtdeEmpenhada;
    itemOriginal.qtdeEntregue = item.qtdeEntregue;

    itemOriginal.valorEntregue = item.valorEntregue;
    itemOriginal.valorUnitario = item.valorUnitario;
    itemOriginal.total = item.total;

    itemOriginal.itemDeBaixa = item.itemDeBaixa;
  }
  public excluirItem(item: ItemDeEmpenho) {
    const lista = this.obterControle('itens') as FormControl<ItemDeEmpenho[]>;
    const novaLista = lista.value.filter(i => i !== item);
    lista.setValue(novaLista);
  }
  //-----------------[Service]-----------------
  public async inativar() {
    return await lastValueFrom(this.service.inativarEmpenho(this.retornaEmpenho()));
  }
  public async editar() {
    const documento = this.retornaEmpenho();

    const patch = compare(this.empenhoOriginal, documento);
    if (patch && patch.length > 0)
      return await lastValueFrom(this.service.editarEmpenho(patch, documento.id));
    else {
      return null;
    }
  }
  public async obterEntidade(id: number) {
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }
  public async obterEmpenho(id: number) {
    return await lastValueFrom(this.service.obterEmpenho(id));
  }
  public async obterNotas(id: number) {
    return await lastValueFrom(this.service.obterNotas(id));
  }
  public async obterNotaPorID(id: number){
    return await lastValueFrom(this.service.obterNotaPorID(id));
  }
  public async excluirNota(id: number) {
    return await lastValueFrom(this.service.excluirNota(id));
  }
  //--------------------------------------------
  private desabilitarFormulario() {
    this.obterControle('idEmpenho').disable();
    this.obterControle('edital').disable();
    this.obterControle('orgao').disable();


    const data = this.obterControle('data');
    const unidade = this.obterControle('unidade');
    const valor = this.obterControle('valor');
    const numEmpenho = this.obterControle('numEmpenho');

    data.enable();
    numEmpenho.enable();
    unidade.enable();
    valor.enable();

    const status = this.obterControle('status').value ?? 1;
    if (status === 2) {
      data.disable();
      numEmpenho.disable();
      unidade.disable();
      valor.disable();
    }
  }
  private retornaEmpenho(): Empenho {
    return {
      id: this.obterControle('idEmpenho').value,
      baixaID: this.idAta,
      edital: this.obterControle('edital').value,
      numEmpenho: this.obterControle('numEmpenho').value,
      status: this.obterControle('status').value ?? 1,
      orgao: this.obterControle('orgao').value?.id ?? 0,
      unidade: this.obterControle('unidade').value?.id ?? 0,
      dataEmpenho: this.obterControle('data').value,
      saldo: 0,
      valor: this.obterControle('valor').value,
      itens: this.obterControle('itens').value
    }
  }
}
