import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AtaLicitacao, AtaLicitacaoSimplificada, BaixaLicitacao } from 'src/app/core/types/documentos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public listar(): Observable<AtaLicitacaoSimplificada[]> {
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/ata`).pipe(
      map(items => items.map(item => ({
        ...item,
        dataLicitacao: this.convertToDate(item.dataLicitacao),
        dataAta: this.convertToDate(item.dataAta)
      })))
    );
  }

  public obterAtaPorID(id: number): Observable<AtaLicitacao> {
    const url = `${this.URL}/ata/${id}`;
    return this.http.get<AtaLicitacao>(url).pipe(
      map((ata: any) => ({
        ...ata,
        dataLicitacao: new Date(ata.dataLicitacao),
        dataAta: new Date(ata.dataAta)
      }))
    );
  }

  public criar(dto: AtaLicitacao): Observable<AtaLicitacao[]> {
    return this.http.post<AtaLicitacao[]>(`${this.URL}/ata`, dto);
  }

  public inativar(id: number): Observable<AtaLicitacaoSimplificada[]> {
    // IMPLEMENTAR
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/documentos`);
  }

  public obterBaixaPorID(id: number): Observable<BaixaLicitacao> {
    const url = `${this.URL}/baixaDoc/${id}`;
    return this.http.get<BaixaLicitacao>(url).pipe(
      map((ata: any) => ({
        ...ata,
        dataLicitacao: new Date(ata.dataLicitacao),
        dataAta: new Date(ata.dataAta)
      }))
    );
  }

  private convertToDate(value: any): Date {
    return value instanceof Date ? value : new Date(value);
  }
}
