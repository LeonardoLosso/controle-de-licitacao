import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Listagem, MudancasParaPatch } from '../types/auxiliares';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudBaseService<Objeto, ObjetoSimplificado> {

  protected URL: string = environment.apiUrl;
  constructor() { }

  public abstract listar(pagina?: number, params?: {key: string, value: any}[]): Observable<Listagem<ObjetoSimplificado>>;

  public abstract obterPorID(id: number): Observable<Objeto>;

  public abstract inativar(cadastro: ObjetoSimplificado): Observable<Objeto>;
  
  public abstract editar(cadastro: MudancasParaPatch[], id?: number): Observable<Objeto>;

  public abstract criar(cadastro: Objeto): Observable<Objeto>;

  public print(id: number): Observable<Blob>{
    throw  console.error("não implementado");
  }
}
