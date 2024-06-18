import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AtaLicitacaoSimplificada } from 'src/app/core/types/documentos';
import { FormularioPesquisaService } from '../services/formulario-pesquisa.service';
import { DocumentosService } from '../services/documentos.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { MensagemModal } from 'src/app/core/types/auxiliares';
import { ModalConfirmacaoComponent } from 'src/app/shared/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent {
  public lista!: AtaLicitacaoSimplificada[];
  public selecionado!: FormControl;
  public pesquisa!: FormControl;

  constructor(
    public form: FormularioPesquisaService,
    private service: DocumentosService,
    private dialog: MatDialog,
    private router: Router,
    private errorMessage: MensagemService
  ) { }

  ngOnInit(): void {
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.pesquisa = this.form.obterControle('pesquisa');

    this.loadData();
  }

  public criar(): void {

  };
  public editar(): void {
    const id: string = this.selecionado.value.id;

    if (!id) {
      return this.errorMessage.openSnackBar('Nenhum cadastro selecionado');
    }

    const queryParams = { ata: id };
    this.router.navigate(['/licitacao'], { queryParams });
  };

  public voltar(): void {
    this.router.navigate(['/']);
  };

  public buscar(): void {
  }

  public limpar(): void {
    this.form.limparFiltros();
  }

  public inativar() {
    const cadastro = this.selecionado.value;

    if (!cadastro) {
      return this.errorMessage.openSnackBar('Nenhum cadastro selecionado');
    }

    this.inativarConfirmar();
  }

  private loadData() {
    this.service.listar().subscribe({
      next: result => {
        this.lista = result;
      }
    });
  }

  private inativarCadastro() {
    const id = this.selecionado.value.id;
    this.service.inativar(id);
  }

  private mensagemInativacao(): MensagemModal {
    const item = this.selecionado.value;
    return {
      titulo: 'Inativar cadastro?',
      mensagem: 'Deseja inativar a cadastro??',
      item: `\nCód: ${item.id} - ${item.nome}`
    }
  }

  private inativarConfirmar() {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: this.mensagemInativacao()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inativarCadastro();
        // this.loadData() Se sucesso
      }
    });
  }
}
