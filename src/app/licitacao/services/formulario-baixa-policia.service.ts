import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentosService } from './documentos.service';
import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { lastValueFrom } from 'rxjs';
import { EmpenhoPolicia } from 'src/app/core/types/documentos';
import { compare } from 'fast-json-patch';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { EnumTipoCadastro } from 'src/app/core/types/enum';

@Injectable({
  providedIn: 'root'
})
export class FormularioBaixaPoliciaService {
  public formulario!: FormGroup;
  public idAta!: number;

  public valorLicitado: number = 0;
  public valorEmpenhado: number = 0;
  public valorEntregue: number = 0;

  private empenhosOriginais!: EmpenhoPolicia[];

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      responsavel: new FormControl(''),
      edital: new FormControl(null),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      notaSelecionada: new FormControl(null),
      unidade: new FormControl(null),
      dataLicitacao: new FormControl(null),
      dataAta: new FormControl(null),
      vigencia: new FormControl(null),
      empresa: new FormControl(null),
      orgao: new FormControl(null),
      notas: new FormControl([]),
      empenhos: new FormControl([]),
      abaSelecionada: new FormControl(0)
    });

    this.desabilitarFormulario();
  }
  public async obterEntidade(id: number) {
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }
  public async obterBaixaPorID(id: number) {
    return await lastValueFrom(this.service.obterBaixaPoliciaPorID(id));
  }
  public async listarNotas(id: number) {
    return await lastValueFrom(this.service.obterNotas(id, 1));
  }
  public async obterNotaPorID(id: number){
    return await lastValueFrom(this.service.obterNotaPorID(id));
  }
  public async excluirNota(id: number) {
    return await lastValueFrom(this.service.excluirNota(id));
  }
  public setUnidadePorID(id: number) {
    const unidade = this.obterControle<EnumNumberID>('unidade');
    const val = EnumTipoCadastro.filter(f => f.id === id)[0];
    unidade.setValue(val);
  }
  public async inativar() {
    if (!this.idAta)
      return null;
    const status = this.obterControle('status').value;
    if (!status)
      return null

    return await lastValueFrom(this.service.inativar(this.idAta, status));
  }
  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }
  public limpar() {
    this.idAta = 0;
    this.formulario.reset();
  }
  public setEmpenhosOriginais() {
    const empenhos = this.obterControle('empenhos').value as EmpenhoPolicia[];

    this.empenhosOriginais = JSON.parse(JSON.stringify(empenhos));
  }
  //-------------------------------------------------------------------------------------------
  public async salvar() {
    const empenhos = this.obterControle('empenhos').value as EmpenhoPolicia[];
    const patch = compare(this.empenhosOriginais, empenhos);
    if (patch && patch.length > 0)
      return await lastValueFrom(this.service.salvarEmpenhosPolicia(patch, this.idAta));
    else {
      return null;
    }
  }
  public adicionarEmpenho(item: EmpenhoPolicia) {
    const lista = this.obterControle('empenhos') as FormControl<EmpenhoPolicia[]>;

    if (!lista.value)
      lista.setValue([]);

    const novaLista = [...lista.value];
    novaLista.push(item);
    lista.setValue(novaLista);
  }
  public editarEmpenho(empenho: EmpenhoPolicia, index: number) {
    const lista = this.obterControle('empenhos') as FormControl<EmpenhoPolicia[]>;

    if (!lista.value)
      lista.setValue([]);

    const novaLista = [...lista.value];
    novaLista[index] = empenho;
    lista.setValue(novaLista);
  }
  public excluirEmpenho(empenho: EmpenhoPolicia) {
    const lista = this.obterControle('empenhos') as FormControl<EmpenhoPolicia[]>;
    const novaLista = lista.value.filter(i => i !== empenho);
    lista.setValue(novaLista);
  }
  //-------------------------------------------------------------------------------------------

  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('responsavel').disable();
    this.obterControle('dataLicitacao').disable();
    this.obterControle('dataAta').disable();
    this.obterControle('vigencia').disable();
    this.obterControle('empresa').disable();
    this.obterControle('unidade').disable();
    this.obterControle('orgao').disable();
  }
}
