import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AtaLicitacao, AtaLicitacaoSimplificada, BaixaLicitacao } from 'src/app/core/types/documentos';
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
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/ata`, {params})
  }

  public obterAtaPorID(id: number): Observable<AtaLicitacao> {
    const url = `${this.URL}/ata/${id}`;
    return this.http.get<AtaLicitacao>(url);
  }

  public criar(dto: AtaLicitacao): Observable<AtaLicitacao> {
    return this.http.post<AtaLicitacao>(`${this.URL}/ata`, dto);
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

  editar(documento: any, id: number): Observable<AtaLicitacao>{
    return this.http.patch<AtaLicitacao>(`${this.URL}/ata/${id}`, documento);
  }
  public obterBaixaPorID(id: number): Observable<BaixaLicitacao> {
    const url = `${this.URL}/baixaDoc/${id}`;
    return this.http.get<BaixaLicitacao>(url)
    // .pipe(
    //   map((ata: any) => ({
    //     ...ata,
    //     dataLicitacao: new Date(ata.dataLicitacao),
    //     dataAta: new Date(ata.dataAta)
    //   }))
    // );
  }
}
