import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { compare } from 'fast-json-patch';

import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { DocumentosService } from './documentos.service';
import { Empenho } from 'src/app/core/types/documentos';

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
      edital: new FormControl(null),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      itemSelecionadoGrid: new FormControl(null),
      orgao: new FormControl(null),
      unidade: new FormControl(null),
      itens: new FormControl([]),
      documentos: new FormControl([]),
      data: new FormControl(null)
    });
    this.desabilitarFormulario();
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
  //-----------------[Service]-----------------
  public async inativar() {
    return await lastValueFrom(this.service.inativarEmpenho(this.retornaEmpenho()));
  }

  public async editar() {
    const documento = this.retornaEmpenho();
    const patch = compare(this.empenhoOriginal, documento);
    console.log(this.empenhoOriginal)
    if (patch && patch.length > 0)
      return await lastValueFrom(this.service.editarEmpenho(patch, documento.id));
    else {
      return null;
    }
  }
  public async ObterEntidade(id: number) {
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }

  public async ObterEmpenho(id: number) {
    return await lastValueFrom(this.service.obterEmpenho(id));
  }

  private desabilitarFormulario() {
    this.obterControle('idEmpenho').disable();
    this.obterControle('edital').disable();
    this.obterControle('orgao').disable();
  }

  private retornaEmpenho(): Empenho {
    return {
      id: this.obterControle('idEmpenho').value,
      baixaId: this.idAta,
      edital: this.obterControle('edital').value,
      status: this.obterControle('status').value ?? 1,
      orgao: this.obterControle('orgao').value?.id ?? 0,
      unidade: this.obterControle('unidade').value?.id ?? 0,
      dataEmpenho: this.obterControle('data').value,
      saldo: 0,
      valor: 0,
      itens: this.obterControle('itens').value
    }
  }
}
