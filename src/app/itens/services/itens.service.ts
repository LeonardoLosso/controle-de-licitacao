import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Item, ItemSimplificado } from 'src/app/core/types/item';

@Injectable({
  providedIn: 'root'
})
export class ItensService extends CrudBaseService<Item, ItemSimplificado> {

  constructor(private http: HttpClient) { super() }

  public listar(): Observable<ItemSimplificado[]> {
    return this.http.get<ItemSimplificado[]>(`${this.URL}/entidades`);
  }

  public obterPorID(id: number): Observable<ItemSimplificado[]> {
    //FALTA IMPLEMENTAR
    return this.http.get<ItemSimplificado[]>(`${this.URL}/entidades`);
  }

  public inativar(id: number): Observable<ItemSimplificado[]> {
    //FALTA IMPLEMENTAR
    return this.http.get<ItemSimplificado[]>(`${this.URL}/entidades`);
  }

  public criar(cadastro: Item): Observable<ItemSimplificado[]> {
    //FALTA IMPLEMENTAR
    return this.http.get<ItemSimplificado[]>(`${this.URL}/entidades`);
  }

  public editar(cadastro: Item): Observable<ItemSimplificado[]> {
    //FALTA IMPLEMENTAR
    return this.http.get<ItemSimplificado[]>(`${this.URL}/entidades`);
  }
}
