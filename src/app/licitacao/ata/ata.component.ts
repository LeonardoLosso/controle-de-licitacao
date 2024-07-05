import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FormularioAtaService } from '../services/formulario-ata.service';
import { ItemDeAta } from 'src/app/core/types/item';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';
import { ModalItemAtaComponent } from './modal-item-ata/modal-item-ata.component';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';

@Component({
  selector: 'app-ata',
  templateUrl: './ata.component.html',
  styleUrls: ['./ata.component.scss']
})
export class AtaComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {
  private id: number = 0;

  public status!: FormControl<number>;
  public listaItens!: FormControl<ItemDeAta[]>;
  public selecionado!: FormControl;

  constructor(
    public form: FormularioAtaService,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MensagemService,
    private dialog: MatDialog,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.status = this.form.obterControle<number>('status');
    this.listaItens = this.form.obterControle<ItemDeAta[]>('itens');
    this.selecionado = this.form.obterControle<ItemDeAta>('selecionadoGrid');

    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializarFormulario(this.id);
    })
  }

  salvar() {
    const control = this.form.obterControle('edital');

    if (!control.valid) {
      return this.messageService.openSnackBar('numero do edital é obrigatório', 'alert');
    }
    this.mostrarSpinner();

    this.form.totalLicitado = this.listaItens.value?.map(t => t.valorTotal).reduce((acc, value) => acc + value, 0);

    if (this.id && this.id != 0) {
      return this.form.editar();
    }
    return this.form.criar().subscribe({
      next: (value) => {
        this.messageService.openSnackBar('Ata criada com sucesso!', 'success');
        this.id === value.id;
        this.form.idAta === 1;
        this.listaItens.setValue(value.itens);
        this.esconderSpinner();
      }, error: () => this.esconderSpinner()
    });
  }

  abrirBaixa() {
    const control = this.form.obterControle('edital');
    const edital = control.value;

    if (control.valid) {
      this.salvar();
      const queryParams = { ata: edital };
      return this.router.navigate(['/licitacao/baixa'], { queryParams });
    }
    return this.messageService.openSnackBar('numero do edital é obrigatório', 'alert'); // mudar para verificar se já foi salvo
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
      return this.messageService.openSnackBar('Nenhum item selecionado');
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
      id: 0,
      ataId: this.form.idAta,
      nome: '',
      unidade: '',
      quantidade: 0,
      valorUnitario: 0,
      valorTotal: 0,
      desconto: 0
    }
  }

  public inicializarFormulario(id: number) {

    this.form.limpar();
    if (id && id !== 0) {
      this.mostrarSpinner();
      this.preencher(id);
    }

  }

  private preencher(id: number) {
    const status = this.form.obterControle<number>('status');
    const edital = this.form.obterControle<string>('edital');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const itens = this.form.obterControle<ItemDeAta[]>('itens');

    const observable = this.form.retornaServiceObter(id);

    observable.subscribe({
      next: result => {
        this.form.idAta = result.id;
        this.form.totalLicitado = result.totalLicitado;
        edital.setValue(result.edital);
        status.setValue(result.status);
        dataLicitacao.setValue(result.dataLicitacao);
        dataAta.setValue(result.dataAta);
        if (result.empresa) {
          const idObjeto: any = result.empresa;
          this.form.setEmpresaPorID(idObjeto);
        }
        if (result.orgao) {
          const idObjeto: any = result.orgao;
          this.form.setOrgaoPorID(idObjeto);
        }
        if (result.vigencia) {
          const data = new Date(result.vigencia);
          vigencia.setValue(data);
        }
        if (result.unidade) {
          this.form.setUnidadePorID(result.unidade);
        }
        itens.setValue(result.itens);

        this.esconderSpinner()
      }, error: () => this.esconderSpinner()
    });
  }
}
