import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtaLicitacaoSimplificada } from 'src/app/core/types/documentos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public listar(): Observable<AtaLicitacaoSimplificada[]> {
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/documentos`);
  }

  public inativar(id: number): Observable<AtaLicitacaoSimplificada[]> {
    // IMPLEMENTAR
    return this.http.get<AtaLicitacaoSimplificada[]>(`${this.URL}/documentos`);
  }
}
