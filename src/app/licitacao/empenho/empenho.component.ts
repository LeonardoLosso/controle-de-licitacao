import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { FormularioEmpenhoService } from '../services/formulario-empenho.service';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ItemDeEmpenho } from 'src/app/core/types/item';
import { Notas } from 'src/app/core/types/documentos';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-empenho',
  templateUrl: './empenho.component.html',
  styleUrls: ['./empenho.component.scss']
})
export class EmpenhoComponent extends SpinnerControlDirective implements OnInit {
  private id!: number;

  public status!: FormControl;
  public selecionado!: FormControl;
  public itemSelecionado!: FormControl;
  public listaItens!: FormControl;
  public listaDocumentos!: FormControl;


  constructor(
    private form: FormularioEmpenhoService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.inicializaFormControl();
  }

  //-------------------[Botões]-------------------
  public cancelar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Cancelar',
        mensagem: 'Deseja cancelar?',
        item: `\nAs alterações NÃO serão salvas`
      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        this.location.back();
      }
    });
  }
  public salvar(){
    
  }
  //----------------------------------------------

  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.listaItens = this.form.obterControle<ItemDeEmpenho[]>('itens');
    this.listaDocumentos = this.form.obterControle<Notas[]>('documentos');
    this.selecionado = this.form.obterControle<Notas>('selecionadoGrid');
    this.itemSelecionado = this.form.obterControle<ItemDeEmpenho>('itemSelecionadoGrid');
  }
}
