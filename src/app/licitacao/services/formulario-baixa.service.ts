import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DocumentosService } from './documentos.service';
import { Entidade } from 'src/app/core/types/entidade';
import { ItemDeBaixa } from 'src/app/core/types/item';
import { EmpenhoSimplificado } from 'src/app/core/types/documentos';
import { lastValueFrom } from 'rxjs';
import { EntidadesService } from 'src/app/entidades/services/entidades.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioBaixaService {

  public formulario!: FormGroup;
  public idAta!: number;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      edital: new FormControl(null),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      dataLicitacao: new FormControl(null),
      dataAta: new FormControl(null),
      vigencia: new FormControl(null),
      empresa: new FormControl(null),
      orgao: new FormControl(null),
      itens: new FormControl([]),
      empenhos: new FormControl([]),
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
    this.obterControle<number>('status').setValue(0);
    this.obterControle<string>('edital').setValue(null);
    this.obterControle<Date>('dataLicitacao').setValue(null);
    this.obterControle<Date>('dataAta').setValue(null);
    this.obterControle<Date>('vigencia').setValue(null);
    this.obterControle<number>('empresa').setValue(null);
    this.obterControle<number>('orgao').setValue(null);
    this.obterControle<ItemDeBaixa[]>('itens').setValue([]);
    this.obterControle<EmpenhoSimplificado[]>('empenhos').setValue([]);
  }

  public async ObterEntidade(id: number){
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }
  public async obterBaixaPorID(id: number){
    return await lastValueFrom(this.service.obterBaixaPorID(id));
  }

  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('dataLicitacao').disable();
    this.obterControle('dataAta').disable();
    this.obterControle('vigencia').disable();
    this.obterControle('empresa').disable();
    this.obterControle('orgao').disable();
  }
}
