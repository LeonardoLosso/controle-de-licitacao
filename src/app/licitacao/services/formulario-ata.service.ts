import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentosService } from './documentos.service';
import { ItemDeAta } from 'src/app/core/types/item';
import { Entidade } from 'src/app/core/types/entidade';
import { EnumTipoCadastro } from 'src/app/core/types/enum';
import { EnumNumberID } from 'src/app/core/types/auxiliares';

@Injectable({
  providedIn: 'root'
})
export class FormularioAtaService {

  public formulario!: FormGroup;
  private sttsControl!: FormControl<number>;

  constructor(private service: DocumentosService) {
    this.formulario = new FormGroup({
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      edital: new FormControl(null),
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

  public inicializarFormulario(id?: string) {

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

  public salvar() {

  }

  public inativar() {

  }

  public excluirItem(item: ItemDeAta) {
    const lista = this.obterControle('itens') as FormControl<ItemDeAta[]>;
    const novaLista = lista.value.filter(i => i !== item);
    lista.setValue(novaLista);
  }

  private preencher(id: string) {
    const status = this.obterControle<number>('status');
    const edital = this.obterControle<string>('edital');
    const dataLicitacao = this.obterControle<Date>('dataLicitacao');
    const dataAta = this.obterControle<Date>('dataAta');
    const vigencia = this.obterControle<Date>('vigencia');
    const empresa = this.obterControle<Entidade>('empresa');
    const orgao = this.obterControle<Entidade>('orgao');
    const unidade = this.obterControle<EnumNumberID>('unidade');
    const itens = this.obterControle<ItemDeAta[]>('itens');

    this.service.obterPorID(1).subscribe({
      next: result => {
        edital.setValue(result.ID);
        status.setValue(result.Status);
        dataLicitacao.setValue(result.DataLicitacao);
        dataAta.setValue(result.DataAta);
        empresa.setValue(result.Empresa);
        orgao.setValue(result.Orgao);
        itens.setValue(result.Itens);
        if (result.Vigencia) {
          const data = new Date(result.Vigencia);
          vigencia.setValue(data);
        }
        if (result.Unidade) {
          //Desfazer gambi
          const val = EnumTipoCadastro.filter(f => f.id === result.Unidade)[0];
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
    this.obterControle<number>('empresa').setValue(null);
    this.obterControle<number>('orgao').setValue(null);
    this.obterControle<string>('unidade').setValue(null);
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
}
