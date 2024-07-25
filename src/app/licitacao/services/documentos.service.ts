import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AtaLicitacao, AtaLicitacaoSimplificada, BaixaLicitacao, Empenho, EmpenhoSimplificado, Reajuste } from 'src/app/core/types/documentos';
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

  public inativar(documento: AtaLicitacaoSimplificada | AtaLicitacao): Observable<AtaLicitacao> {
    var id = documento.id;
    var novoValor = documento.status === 1 ? '2' : '1';
    var status = {
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

  public criarBaixa(id: number): Observable<BaixaLicitacao> {
    return this.http.post<BaixaLicitacao>(`${this.URL}/baixa`, id);
  }

  public editarBaixa(id: number): Observable<BaixaLicitacao> {
    return this.http.put<BaixaLicitacao>(`${this.URL}/baixa/atualizar`, id);
  }

  public inativarBaixa(documento: BaixaLicitacao): Observable<BaixaLicitacao> {
    var id = documento.id;
    var novoValor = documento.status === 1 ? '2' : '1';
    var status = {
      op: "replace",
      path: "/status",
      value: novoValor
    }
    return this.http.patch<BaixaLicitacao>(`${this.URL}/baixa/status/${id}`, [status]);
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
    var id = documento.id;
    var novoValor = documento.status === 1 ? '2' : '1';
    var status = {
      op: "replace",
      path: "/status",
      value: novoValor
    }
    return this.http.patch<Empenho>(`${this.URL}/empenho/status/${id}`, [status]);
  }

  public editarEmpenho(documento: any, id: number): Observable<Empenho> {
    return this.http.patch<Empenho>(`${this.URL}/empenho/${id}`, documento);
  }
}
