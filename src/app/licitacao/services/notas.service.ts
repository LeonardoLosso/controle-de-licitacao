import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem, MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { Nota, NotaSimplificada } from 'src/app/core/types/documentos';

@Injectable({
  providedIn: 'root'
})
export class NotasService extends CrudBaseService<Nota, NotaSimplificada> {

  constructor(private http: HttpClient) { super() }

  public override criar(cadastro: Nota): Observable<Nota> {
    return this.http.post<Nota>(`${this.URL}/nota`, cadastro);
  }
  public override inativar(cadastro: NotaSimplificada): Observable<Nota> {
    throw null;
  }
  public override editar(documento: MudancasParaPatch[], id?: number): Observable<Nota> {
    return this.http.patch<Nota>(`${this.URL}/nota/${id}`, documento);
  }
  public override obterPorID(id: number): Observable<Nota> {
    throw null;
  }
  //Implementado em documento service
  public override listar(pagina?: number, params?: { key: string; value: any; }[]): Observable<Listagem<NotaSimplificada>> {
    throw null;
  }

  public override print(id: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });
    return this.http.get<Blob>(`${this.URL}/nota/report/${id}`, { headers: headers, responseType: 'blob' as 'json'});
  }
}
