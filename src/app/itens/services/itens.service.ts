import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem } from 'src/app/core/types/auxiliares';
import { Item, ItemSimplificado } from 'src/app/core/types/item';

@Injectable({
  providedIn: 'root'
})
export class ItensService extends CrudBaseService<Item, ItemSimplificado> {

  constructor(private http: HttpClient) { super() }

  public listar(): Observable<Listagem<ItemSimplificado>> {
    return this.http.get<Listagem<ItemSimplificado>>(`${this.URL}/itens`);
  }

  public obterPorID(id: number): Observable<Item> {
    //FALTA IMPLEMENTAR
    return this.http.get<Item>(`${this.URL}/entidades`);
  }

  public inativar(item: ItemSimplificado): Observable<Item> {
    //FALTA IMPLEMENTAR
    return this.http.get<Item>(`${this.URL}/entidades`);
  }

  public criar(cadastro: Item): Observable<Item> {
    //FALTA IMPLEMENTAR
    return this.http.get<Item>(`${this.URL}/entidades`);
  }

  public editar(cadastro: Item): Observable<Item> {
    //FALTA IMPLEMENTAR
    return this.http.get<Item>(`${this.URL}/entidades`);
  }
}
