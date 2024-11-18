import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem, MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { Item, ItemDeBaixa, ItemDeEmpenho, ItemSimplificado } from 'src/app/core/types/item';

@Injectable({
  providedIn: 'root'
})
export class ItensService extends CrudBaseService<Item, ItemSimplificado> {

  constructor(private http: HttpClient) { super() }

  public listar(pagina?: number, parametros?: { key: string, value: any }[]): Observable<Listagem<ItemSimplificado>> {
    let params = new HttpParams();

    if (pagina) params = params.append('pagina', pagina);
    if (parametros) {
      parametros.forEach(param => {
        if (param.value != null) {
          params = params.append(param.key, param.value);
        }
      });
    }

    return this.http.get<Listagem<ItemSimplificado>>(`${this.URL}/itens`, { params });
  }

  public obterPorID(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.URL}/itens/${id}`);
  }

  public inativar(item: ItemSimplificado): Observable<Item> {
    const id = item.id;
    const novoValor = item.status === 1 ? '2' : '1';
    const status = {
      op: "replace",
      path: "/status",
      value: novoValor
    }
    return this.http.patch<Item>(`${this.URL}/itens/status/${id}`, [status]);
  }

  public criar(cadastro: Item): Observable<Item> {
    return this.http.post<Item>(`${this.URL}/itens`, cadastro);
  }

  public editar(patch: MudancasParaPatch[], id: number): Observable<Item> {
    return this.http.patch<Item>(`${this.URL}/itens/${id}`, patch);
  }

  public listarItensBaixa(id: number, parametros?: { key: string, value: any }[]): Observable<ItemDeBaixa[]> {
    let params = new HttpParams();

    if (parametros) {
      parametros.forEach(param => {
        if (param.value != null) {
          params = params.append(param.key, param.value);
        }
      });
    }
    return this.http.get<ItemDeBaixa[]>(`${this.URL}/baixa/itens/${id}`, { params });
  }

  public listarItensEmpenho(id: number, search: string = ''): Observable<ItemDeEmpenho[]> {
    const params = new HttpParams().set('search', search.toString());
    return this.http.get<ItemDeEmpenho[]>(`${this.URL}/empenho/itens/${id}`, { params });
  }
}
