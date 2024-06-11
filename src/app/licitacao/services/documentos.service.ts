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
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/documentos`).pipe(
      map(items => items.map(item => ({
        ...item,
        DataLicitacao: this.convertToDate(item.DataLicitacao),
        DataAta: this.convertToDate(item.DataAta)
      })))
    );
  }

  public obterAtaPorID(id: number): Observable<AtaLicitacao> {
    const url = `${this.URL}/ataDoc/${id}`;
    return this.http.get<AtaLicitacao>(url).pipe(
      map((ata: any) => ({
        ...ata,
        DataLicitacao: new Date(ata.DataLicitacao),
        DataAta: new Date(ata.DataAta)
      }))
    );
  }

  public obterBaixaPorID(id: number): Observable<BaixaLicitacao> {
    const url = `${this.URL}/baixaDoc/${id}`;
    return this.http.get<BaixaLicitacao>(url).pipe(
      map((ata: any) => ({
        ...ata,
        DataLicitacao: new Date(ata.DataLicitacao),
        DataAta: new Date(ata.DataAta)
      }))
    );
  }

  public inativar(id: number): Observable<AtaLicitacaoSimplificada[]> {
    // IMPLEMENTAR
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/documentos`);
  }

  private convertToDate(value: any): Date {
    return value instanceof Date ? value : new Date(value);
  }
}
