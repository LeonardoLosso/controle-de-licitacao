import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { FormularioBaixaPoliciaService } from '../services/formulario-baixa-policia.service';
import { MatDialog } from '@angular/material/dialog';
import { MensagemService } from 'src/app/core/services/mensagem.service';

@Component({
  selector: 'app-baixa-policia',
  templateUrl: './baixa-policia.component.html',
  styleUrls: ['./baixa-policia.component.scss']
})
export class BaixaPoliciaComponent extends SpinnerControlDirective implements OnInit, AfterViewInit {

  private id!: number;

  public aba!: FormControl;
  public status!: FormControl;
  public selecionado!: FormControl;

  public listaNotas!: FormControl;
  public listaEmpenho!: FormControl;
  public label: 'Empenho' | 'Nota' = 'Empenho'


  constructor(
    private form: FormularioBaixaPoliciaService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private mensagemService: MensagemService,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.form.limpar();
    this.inicializaFormControl();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializaDados();
    })
  }
  onTabChange(index: number) {
    this.aba.setValue(index);
    this.label = this.aba.value === 0 ? 'Empenho' : 'Nota'
  }
  //------------------------------------------------------------------
  public cancelar() {
    const queryParams = { ata: this.id };
    this.router.navigate(['/licitacao'], { queryParams });
  }

  public inativar(){}

  public salvar(){}

  public editarEmpenho(){}

  public novoEmpenho(){}

  public excluirEmpenho(){}

  public adicionarNota(){}

  public editarNota(){}

  public excluirNota(){}
  //-------------------------------------------------------------------
  private inicializaFormControl() {
    this.status = this.form.obterControle('status');
    this.selecionado = this.form.obterControle('selecionadoGrid');
    this.listaEmpenho = this.form.obterControle('empenhos');
    this.listaNotas = this.form.obterControle('notas');
    this.aba = this.form.obterControle('abaSelecionada');

  }
  private async inicializaDados() {
    this.route.queryParams.subscribe(params => {
      this.id = params['ata'];
    });

    await this.inicializarFormulario(this.id);
  }

  private async inicializarFormulario(id?: number) {

    this.form.limpar();
    if (id && id !== 0) {
      this.mostrarSpinner();
      try {
        await this.preencher(id);
      }
      finally {
        this.esconderSpinner();
      }
    }
  }

  private async preencher(id: number) {
    const status = this.form.obterControle<number>('status');
    const edital = this.form.obterControle<string>('edital');
    const dataLicitacao = this.form.obterControle<Date>('dataLicitacao');
    const dataAta = this.form.obterControle<Date>('dataAta');
    const vigencia = this.form.obterControle<Date>('vigencia');
    const empresa = this.form.obterControle('empresa');
    const orgao = this.form.obterControle('orgao');
    const notas = this.form.obterControle('notas');
    const empenhos = this.form.obterControle('empenhos');

    const result = await this.form.obterBaixaPorID(id);

    if (result) {
      this.form.idAta = result.id;
      edital.setValue(result.edital);
      status.setValue(result.status);
      dataLicitacao.setValue(result.dataLicitacao);
      dataAta.setValue(result.dataAta);
      vigencia.setValue(result.vigencia);
      notas.setValue(result.itens);

      if (result.empresa)
        empresa.setValue(await this.form.obterEntidade(result.empresa as any));

      if (result.orgao)
        orgao.setValue(await this.form.obterEntidade(result.orgao as any));

      // empenhos.setValue(await this.form.listarEmpenhos(result.id));
    }
  }
}
