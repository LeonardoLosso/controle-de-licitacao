import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { DocumentosService } from './documentos.service';
import { BaixaLicitacao } from 'src/app/core/types/documentos';
import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { EnumNumberID } from 'src/app/core/types/auxiliares';
import { EnumTipoCadastro } from 'src/app/core/types/enum';

@Injectable({
  providedIn: 'root'
})
export class FormularioBaixaService {

  public formulario!: FormGroup;
  public idAta!: number;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      responsavel: new FormControl(''),
      edital: new FormControl(null),
      status: new FormControl(0),
      unidade: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      dataLicitacao: new FormControl(null),
      dataAta: new FormControl(null),
      vigencia: new FormControl(null),
      empresa: new FormControl(null),
      orgao: new FormControl(null),
      itens: new FormControl([]),
      empenhos: new FormControl([])
    });

    this.desabilitarFormulario();
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

  public async obterEntidade(id: number) {
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }
  public setUnidadePorID(id: number) {
    const unidade = this.obterControle<EnumNumberID>('unidade');
    const val = EnumTipoCadastro.filter(f => f.id === id)[0];
    unidade.setValue(val);
  }
  public async obterBaixaPorID(id: number) {
    return await lastValueFrom(this.service.obterBaixaPorID(id));
  }
  public async listarEmpenhos(id: number) {
    return await lastValueFrom(this.service.listarEmpenhos(id));
  }
  public async novoEmpenho() {
    return await lastValueFrom(this.service.criarEmpenho(this.retornaBaixa()));
  }
  public async excluirEmpenho(id: number) {
    return await lastValueFrom(this.service.excluirEmpenho(id));
  }

  public async inativar() {
    if (!this.idAta)
      return null;
    const status = this.obterControle('status').value;
    if(!status)
      return null

    return await lastValueFrom(this.service.inativar(this.idAta, status));
  }

  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('responsavel').disable();
    this.obterControle('dataLicitacao').disable();
    this.obterControle('dataAta').disable();
    this.obterControle('vigencia').disable();
    this.obterControle('empresa').disable();
    this.obterControle('orgao').disable();
    this.obterControle('unidade').disable();
  }

  private retornaBaixa(): BaixaLicitacao {

    return {
      id: this.idAta,
      responsavel: this.obterControle('responsavel').value,
      edital: this.obterControle('edital').value,
      status: this.obterControle('status').value ?? 1,
      empresa: this.obterControle('empresa').value?.id ?? 0,
      unidade: this.obterControle('unidade').value?.id ?? 0,
      orgao: this.obterControle('orgao').value?.id ?? 0,
      dataLicitacao: this.obterControle('dataLicitacao').value,
      dataAta: this.obterControle('dataAta').value,
      vigencia: this.obterControle('vigencia').value,
      itens: this.obterControle('itens').value
    }
  }
}
