import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AtaLicitacao, AtaLicitacaoSimplificada, BaixaLicitacao, Empenho, EmpenhoSimplificado, Nota, NotaSimplificada, Reajuste } from 'src/app/core/types/documentos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public listar(pagina?: number, parametros?: { key: string, value: any }[]): Observable<AtaLicitacaoSimplificada[]> {
    let params = new HttpParams();

    if (pagina) params = params.append('pagina', pagina);
    if (parametros) {
      parametros.forEach(param => {
        if (param.value != null) {
          params = params.append(param.key, param.value);
        }
      });
    }
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/ata`, { params })
  }

  public obterAtaPorID(id: number): Observable<AtaLicitacao> {
    const url = `${this.URL}/ata/${id}`;
    return this.http.get<AtaLicitacao>(url);
  }

  public criar(dto: AtaLicitacao): Observable<AtaLicitacao> {
    return this.http.post<AtaLicitacao>(`${this.URL}/ata`, dto);
  }

  public editar(documento: any, id: number): Observable<AtaLicitacao> {
    return this.http.patch<AtaLicitacao>(`${this.URL}/ata/${id}`, documento);
  }

  public inativar(id: number, statusAtual: number): Observable<AtaLicitacao> {
    const novoValor = statusAtual === 1 ? '2' : '1';
    const status = {
      op: "replace",
      path: "/status",
      value: novoValor
    }
    return this.http.patch<AtaLicitacao>(`${this.URL}/ata/status/${id}`, [status]);
  }

  public obterHistorico(id: number): Observable<Reajuste[]> {
    return this.http.get<Reajuste[]>(`${this.URL}/ata/reajuste/${id}`);
  }

  public gerarHistorico(reajuste: Reajuste): Observable<Reajuste[]> {
    return this.http.post<Reajuste[]>(`${this.URL}/ata/reajuste`, reajuste);
  }

  public excluirHistorico(reajuste: Reajuste): Observable<Reajuste[]> {
    const httpParams = new HttpParams()
      .set('ataId', reajuste.ataID.toString())
      .set('reajusteId', reajuste.id.toString());

    const options = { params: httpParams };

    return this.http.delete<Reajuste[]>(`${this.URL}/ata/reajuste`, options);
  }

  public obterBaixaPorID(id: number): Observable<BaixaLicitacao> {
    const url = `${this.URL}/baixa/${id}`;
    return this.http.get<BaixaLicitacao>(url)
  }

  public listarEmpenhos(id: number): Observable<EmpenhoSimplificado[]> {
    const url = `${this.URL}/empenho/${id}`;
    return this.http.get<EmpenhoSimplificado[]>(url)
  }

  public criarEmpenho(dto: BaixaLicitacao): Observable<Empenho> {
    const url = `${this.URL}/empenho`
    return this.http.post<Empenho>(url, dto);
  }

  public excluirEmpenho(id: number): Observable<Empenho> {
    const httpParams = new HttpParams()
      .set('id', id.toString());

    const options = { params: httpParams };
    const url = `${this.URL}/empenho`
    return this.http.delete<Empenho>(url, options);
  }

  public obterEmpenho(id: number): Observable<Empenho> {
    const url = `${this.URL}/empenho/obter/${id}`;
    return this.http.get<Empenho>(url);
  }

  public inativarEmpenho(documento: Empenho): Observable<Empenho> {
    const id = documento.id;
    const novoValor = documento.status === 1 ? '2' : '1';
    const status = {
      op: "replace",
      path: "/status",
      value: novoValor
    }
    return this.http.patch<Empenho>(`${this.URL}/empenho/status/${id}`, [status]);
  }

  public editarEmpenho(documento: any, id: number): Observable<Empenho> {
    return this.http.patch<Empenho>(`${this.URL}/empenho/${id}`, documento);
  }

  public possuiEmpenho(id: number): Observable<boolean> {
    const url = `${this.URL}/empenho/existe/${id}`;
    return this.http.get<boolean>(url);
  }

  public obterNotas(id: number): Observable<NotaSimplificada[]> {
    const url = `${this.URL}/nota/${id}`;
    return this.http.get<NotaSimplificada[]>(url);
  }
  public excluirNota(id: number): Observable<Nota> {
    const httpParams = new HttpParams()
      .set('id', id.toString());

    const options = { params: httpParams };
    const url = `${this.URL}/nota`
    return this.http.delete<Nota>(url, options);
  }
  public obterNotaPorID(id: number): Observable<Nota> {
    const url = `${this.URL}/nota/obter/${id}`;
    return this.http.get<Nota>(url);
  }

  public obterBaixaPoliciaPorID(id: number): Observable<BaixaLicitacao> {
    const url = `${this.URL}/baixa/${id}`;
    return this.http.get<BaixaLicitacao>(url)
  }
}
