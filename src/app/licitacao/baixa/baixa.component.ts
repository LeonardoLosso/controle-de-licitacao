import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormularioBaixaService } from '../services/formulario-baixa.service';
import { ItemDeBaixa } from 'src/app/core/types/item';

@Component({
  selector: 'app-baixa',
  templateUrl: './baixa.component.html',
  styleUrls: ['./baixa.component.scss']
})
export class BaixaComponent implements OnInit {

  public status!: FormControl;
  public selecionado!: FormControl;
  public listaItens!: FormControl;

  constructor(
    private form: FormularioBaixaService
  ) { }

  ngOnInit(): void {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeBaixa[]>('itens');
    this.selecionado = this.form.obterControle<ItemDeBaixa>('selecionadoGrid');
  }

  public cancelar() { }
  public abrirBaixa() { }
  public salvar() { }
  public inativar() { }
  public novoItem() { }
  public excluirItem() { }
}
