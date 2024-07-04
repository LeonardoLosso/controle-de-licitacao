import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DocumentosService } from './documentos.service';
import { ItemDeAta } from 'src/app/core/types/item';
import { Entidade } from 'src/app/core/types/entidade';
import { EnumTipoCadastro } from 'src/app/core/types/enum';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { AtaLicitacao } from 'src/app/core/types/documentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioAtaService {

  public formulario!: FormGroup;
  public idAta!: number;
  public totalReajustes!: number;
  private sttsControl!: FormControl<number>;
  constructor(private service: DocumentosService) {
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

  }

  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }

  public inicializarFormulario(id: number) {

    this.limpar();
    if (id) {
      this.preencher(id);
    }

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

  private preencher(id: number) {
    const status = this.obterControle<number>('status');
    const edital = this.obterControle<string>('edital');
    const dataLicitacao = this.obterControle<Date>('dataLicitacao');
    const dataAta = this.obterControle<Date>('dataAta');
    const vigencia = this.obterControle<Date>('vigencia');
    const empresa = this.obterControle<Entidade>('empresa');
    const orgao = this.obterControle<Entidade>('orgao');
    const unidade = this.obterControle<EnumNumberID>('unidade');
    const itens = this.obterControle<ItemDeAta[]>('itens');

    this.service.obterAtaPorID(id).subscribe({
      next: result => {
        edital.setValue(result.id);
        status.setValue(result.status);
        dataLicitacao.setValue(result.dataLicitacao);
        dataAta.setValue(result.dataAta);
        empresa.setValue(result.empresa);
        orgao.setValue(result.orgao);
        itens.setValue(result.itens);
        if (result.vigencia) {
          const data = new Date(result.vigencia);
          vigencia.setValue(data);
        }
        if (result.unidade) {
          //Desfazer gambi
          const val = EnumTipoCadastro.filter(f => f.id === result.unidade)[0];
          unidade.setValue(val);
        }
      }
    });
  }

  private limpar() {
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
      totalLicitado: 0,
      totalReajustes: this.totalReajustes
    }
  }
}
