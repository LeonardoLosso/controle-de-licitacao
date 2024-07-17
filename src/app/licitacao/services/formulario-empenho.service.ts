import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { DocumentosService } from './documentos.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioEmpenhoService {

  public formulario!: FormGroup;
  public id!: number;
  public idAta!: number;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
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

  public async ObterEntidade(id: number) {
    return await lastValueFrom(this.entidadeService.obterPorID(id));
  }

  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('orgao').disable();
  }
}
