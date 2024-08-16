import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentosService } from './documentos.service';
import { EntidadesService } from 'src/app/entidades/services/entidades.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioBaixaPoliciaService {
  public formulario!: FormGroup;
  public idAta!: number;

  constructor(private service: DocumentosService, private entidadeService: EntidadesService) {
    this.formulario = new FormGroup({
      edital: new FormControl(null),
      status: new FormControl(0),
      selecionadoGrid: new FormControl(null),
      notaSelecionada: new FormControl(null),
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


  private desabilitarFormulario() {
    this.obterControle('edital').disable();
    this.obterControle('dataLicitacao').disable();
    this.obterControle('dataAta').disable();
    this.obterControle('vigencia').disable();
    this.obterControle('empresa').disable();
    this.obterControle('orgao').disable();
  }
}
