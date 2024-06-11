import { Component, OnInit } from '@angular/core';
import { FormularioAtaService } from '../services/formulario-ata.service';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ItemDeAta } from 'src/app/core/types/item';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ModalItemAtaComponent } from './modal-item-ata/modal-item-ata.component';

@Component({
  selector: 'app-ata',
  templateUrl: './ata.component.html',
  styleUrls: ['./ata.component.scss']
})
export class AtaComponent implements OnInit {
  private id!: string;

  public status!: FormControl<number>;
  public listaItens!: FormControl<ItemDeAta[]>;
  public selecionado!: FormControl;

  constructor(
    public form: FormularioAtaService,
    private location: Location,
    private route: ActivatedRoute,
    private errorMessage: MensagemService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.status = this.form.obterControle<number>('status');
    this.listaItens = this.form.obterControle<ItemDeAta[]>('itens');
    this.selecionado = this.form.obterControle<ItemDeAta>('selecionadoGrid');

    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });

    this.form.inicializarFormulario(this.id);
  }

  salvar() {
    const control = this.form.obterControle('edital');
    const id = control.value;

    if (!control.valid) {
      return this.errorMessage.openSnackBar('Numero do edital é obrigatório');
    }
    this.form.salvar();
  }

  abrirBaixa() {
    const control = this.form.obterControle('edital');
    const id = control.value;
    debugger
    if (control.valid) {
      this.salvar();
      const queryParams = { ata: id };
      return this.router.navigate(['/licitacao/baixa'], { queryParams });
    }
    return this.errorMessage.openSnackBar('Numero do edital é obrigatório');
  }

  inativar() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Inativar',
        mensagem: 'Deseja inativar ata?',
        item: `\nAs alterações NÃO salvas serão descartadas`

      }
    });

    confirmacao.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.status.value === 2) {
          this.status.setValue(1);
        } else {
          this.status.setValue(2);
        }
        this.form.inativar();
      }
    });

  }

  novoItem() {
    const item = this.itemVazio();

    const dialogRef = this.dialog.open(ModalItemAtaComponent, {
      disableClose: true,
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novoItem: ItemDeAta = result;
        this.form.adicionarItem(novoItem);
      }
    });
  }

  excluirItem() {
    const item = this.selecionado.value;

    if (!item) {
      return this.errorMessage.openSnackBar('Nenhum item selecionado');
    }

    this.form.excluirItem(item);
  }

  editarItem() {
    const item = this.selecionado.value;
    //item modal
  }

  cancelar() {
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

  private itemVazio(): ItemDeAta {
    return {
      ID: 0,
      Nome: '',
      Unidade: '',
      Quantidade: 0,
      ValorUnitario: 0,
      ValorTotal: 0,
      Desconto: 0
    }
  }
}
