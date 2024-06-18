import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem } from 'src/app/core/types/auxiliares';
import { Permissoes, Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends CrudBaseService<Usuario, UsuarioSimplificado> {

  constructor(private http: HttpClient) { super() }

  public listar(): Observable<Listagem<UsuarioSimplificado>> {
    return this.http.get<Listagem<UsuarioSimplificado>>(`${this.URL}/usuarios`);
  }

  public obterPorID(id: number): Observable<Usuario> {
    // IMPLEMENTAR
    return this.http.get<Usuario>(`${this.URL}/usuarios`);
  }

  public inativar(user: UsuarioSimplificado): Observable<Usuario> {
    // IMPLEMENTAR
    return this.http.get<Usuario>(`${this.URL}/usuarios`);
  }

  public criar(cadastro: Usuario): Observable<Usuario> {
    // IMPLEMENTAR
    return this.http.get<Usuario>(`${this.URL}/usuarios`);
  }

  public editar(cadastro: Usuario): Observable<Usuario> {
    // IMPLEMENTAR
    return this.http.get<Usuario>(`${this.URL}/usuarios`);
  }

  public ObterRecursos(): Observable<Permissoes[]> {
    return this.http.get<Permissoes[]>(`${this.URL}/permissoes`);
  }
}
