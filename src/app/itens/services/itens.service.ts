import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem, MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { Item, ItemSimplificado } from 'src/app/core/types/item';

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
    var id = item.id;
        var novoValor = item.status === 1 ? '2' : '1';
        var status = {
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
}
