import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudBaseService<Objeto, ObjetoSimplificado> {

  protected URL: string = environment.apiUrl;
  constructor() { }

  public abstract listar(): Observable<ObjetoSimplificado[]>;

  public abstract obterPorID(id: number): Observable<ObjetoSimplificado[]>;

  public abstract inativar(id: number): Observable<ObjetoSimplificado[]>;
  
  public abstract editar(cadastro: Objeto): Observable<ObjetoSimplificado[]>;

  public abstract criar(cadastro: Objeto): Observable<ObjetoSimplificado[]>;
}
