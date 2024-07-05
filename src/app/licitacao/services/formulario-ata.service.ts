import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DocumentosService } from './documentos.service';
import { ItemDeAta } from 'src/app/core/types/item';
import { Entidade } from 'src/app/core/types/entidade';
import { EnumTipoCadastro } from 'src/app/core/types/enum';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { AtaLicitacao } from 'src/app/core/types/documentos';
import { EntidadesService } from 'src/app/entidades/services/entidades.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioAtaService {

  public formulario!: FormGroup;
  public idAta!: number;
  public totalLicitado!: number;
  public totalReajustes!: number;
  private sttsControl!: FormControl<number>;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      edital: new FormControl(null, [Validators.required]),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      dataLicitacao: new FormControl(null),
      dataAta: new FormControl(null),
      vigencia: new FormControl(null),
      empresa: new FormControl(null),
      orgao: new FormControl(null),
      unidade: new FormControl(null),
      itens: new FormControl([])
    });

    this.sttsControl = this.obterControle<number>('status');

    this.sttsControl.valueChanges.subscribe(value => {
      if (value === 2) {
        this.desabilitarFormulario();
      } else {
        this.habilitarFormulario();
      }
    });

    const dataAta = this.obterControle<Date>('dataAta');
    const vigencia = this.obterControle<Date>('vigencia');

    dataAta.valueChanges.subscribe(value => {
      if (value && value instanceof Date) {
        const vigenciaDate = new Date(value);
        vigenciaDate.setFullYear(value.getFullYear() + 1);
        vigencia.setValue(vigenciaDate);
      } else {
        vigencia.setValue(null);
      }
    });

    const orgao = this.obterControle<Entidade>('orgao');
    const unidade = this.obterControle<EnumNumberID>('unidade');

    orgao.valueChanges.subscribe(value => {
      if (value && value.tipo === 3) {
        const val = EnumTipoCadastro.filter(f => f.id === 3)[0]
        unidade.setValue(val);
      }
    });
  }

  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }


  public adicionarItem(item: ItemDeAta) {
    const lista = this.obterControle('itens') as FormControl<ItemDeAta[]>;
    const novaLista = [...lista.value];
    novaLista.push(item);
    lista.setValue(novaLista);
  }

  public criar(): Observable<AtaLicitacao> {
    const ataLicitacao = this.retornaAta();

    return this.service.criar(ataLicitacao);
  }
  public editar() {

  }
  public inativar() {

  }

  public excluirItem(item: ItemDeAta) {
    const lista = this.obterControle('itens') as FormControl<ItemDeAta[]>;
    const novaLista = lista.value.filter(i => i !== item);
    lista.setValue(novaLista);
  }

  public retornaServiceObter(id: number): Observable<AtaLicitacao> {
    return this.service.obterAtaPorID(id);
  }

  public setEmpresaPorID(id: number) {
    const empresa = this.obterControle<Entidade>('empresa');
    this.entidadeService.obterPorID(id)
      .subscribe(value => empresa.setValue(value));
  }

  public setOrgaoPorID(id: number) {
    const orgao = this.obterControle<Entidade>('orgao');
    this.entidadeService.obterPorID(id)
      .subscribe(value => orgao.setValue(value));
  }

  public setUnidadePorID(id: number) {
    const unidade = this.obterControle<EnumNumberID>('unidade');
    const val = EnumTipoCadastro.filter(f => f.id === id)[0];
    unidade.setValue(val);
  }

  public limpar() {
    this.idAta = 0;
    this.totalLicitado = 0;
    this.obterControle<number>('status').setValue(0);
    this.obterControle<string>('edital').setValue(null);
    this.obterControle<Date>('dataLicitacao').setValue(null);
    this.obterControle<Date>('dataAta').setValue(null);
    this.obterControle<Date>('vigencia').setValue(null);
    this.obterControle<Entidade>('empresa').setValue(null);
    this.obterControle<Entidade>('orgao').setValue(null);
    this.obterControle<EnumNumberID>('unidade').setValue(null);
    this.obterControle<ItemDeAta[]>('itens').setValue([]);
  }

  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('dataLicitacao').disable();
    this.obterControle('dataAta').disable();
    this.obterControle('vigencia').disable();
    this.obterControle('empresa').disable();
    this.obterControle('orgao').disable();
    this.obterControle('unidade').disable();
  }

  private habilitarFormulario() {
    this.obterControle('edital').enable();
    this.obterControle('dataLicitacao').enable();
    this.obterControle('dataAta').enable();
    this.obterControle('vigencia').enable();
    this.obterControle('empresa').enable();
    this.obterControle('orgao').enable();
    this.obterControle('unidade').enable();
  }

  private retornaAta(): AtaLicitacao {

    return {
      id: this.idAta,
      edital: this.obterControle('edital').value,
      status: this.obterControle('status').value?.id ?? 1,
      tipo: this.obterControle('unidade').value?.id ?? 0,
      unidade: this.obterControle('unidade').value?.id ?? 0,
      empresa: this.obterControle('empresa').value?.id ?? 0,
      orgao: this.obterControle('orgao').value?.id ?? 0,
      dataLicitacao: this.obterControle('dataLicitacao').value,
      dataAta: this.obterControle('dataAta').value,
      vigencia: this.obterControle('vigencia').value,
      itens: this.obterControle('itens').value,
      totalLicitado: this.totalLicitado,
      totalReajustes: this.totalReajustes
    }
  }
}
