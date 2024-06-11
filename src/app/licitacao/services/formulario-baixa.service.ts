import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocumentosService } from './documentos.service';

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
  }

  public obterControle<T>(nome: string): FormControl {
    const control = this.formulario.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl<T>;
  }
}
