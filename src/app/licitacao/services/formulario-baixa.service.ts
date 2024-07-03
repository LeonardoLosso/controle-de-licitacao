import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DocumentosService } from './documentos.service';
import { Entidade } from 'src/app/core/types/entidade';
import { ItemDeBaixa } from 'src/app/core/types/item';
import { EmpenhoSimplificado } from 'src/app/core/types/documentos';

@Injectable({
  providedIn: 'root'
})
export class FormularioBaixaService {

  public formulario!: FormGroup;

  constructor(private service: DocumentosService) {
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

  public inicializarFormulario(id?: string) {

    this.limpar();
    if (id) {
      this.preencher(id);
    }

  }
  private preencher(id: string) {
    const status = this.obterControle<number>('status');
    const edital = this.obterControle<string>('edital');
    const dataLicitacao = this.obterControle<Date>('dataLicitacao');
    const dataAta = this.obterControle<Date>('dataAta');
    const vigencia = this.obterControle<Date>('vigencia');
    const empresa = this.obterControle<Entidade>('empresa');
    const orgao = this.obterControle<Entidade>('orgao');
    const itens = this.obterControle<ItemDeBaixa[]>('itens');
    const empenhos = this.obterControle<EmpenhoSimplificado[]>('empenhos');

    this.service.obterBaixaPorID(1).subscribe({
      next: result => {
        edital.setValue(result.id);
        status.setValue(result.status);
        dataLicitacao.setValue(result.dataLicitacao);
        dataAta.setValue(result.dataAta);
        empresa.setValue(result.empresa);
        orgao.setValue(result.orgao);
        itens.setValue(result.itens);
        empenhos.setValue(result.Empenhos);

        if (result.vigencia) {
          const data = new Date(result.vigencia);
          vigencia.setValue(data);
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
    this.obterControle<ItemDeBaixa[]>('itens').setValue([]);
    this.obterControle<EmpenhoSimplificado[]>('empenhos').setValue([]);
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
