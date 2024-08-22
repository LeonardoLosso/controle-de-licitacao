import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';

import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem, MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { Permissoes, Usuario, UsuarioSimplificado } from 'src/app/core/types/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends CrudBaseService<Usuario, UsuarioSimplificado> {

  constructor(private http: HttpClient) { super() }

  public listar(pagina?: number, parametros?: { key: string, value: any }[]): Observable<Listagem<UsuarioSimplificado>> {
    let params = new HttpParams();

        if (pagina) params = params.append('pagina', pagina);
        if (parametros) {
            parametros.forEach(param => {
                if (param.value != null) {
                    params = params.append(param.key, param.value);
                }
            });
        }
    return this.http.get<Listagem<UsuarioSimplificado>>(`${this.URL}/usuarios`, {params});
  }

  public obterPorID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}/usuarios/${id}`);
  }

  public inativar(user: UsuarioSimplificado): Observable<Usuario> {
    const id = user.id;
        const novoValor = user.status === 1 ? '2' : '1';
        const status = {
            op: "replace",
            path: "/status",
            value: novoValor
        }
        return this.http.patch<Usuario>(`${this.URL}/usuarios/status/${id}`, [status]);
  }

  public criar(cadastro: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.URL}/usuarios`, cadastro);
  }

  public editar(cadastro: MudancasParaPatch[], id: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.URL}/usuarios/${id}`, cadastro);
  }

  public ObterRecursos(): Observable<Permissoes[]> {
    return this.http.get<Permissoes[]>(`${this.URL}/usuarios/recursos`);
  }

  public ObterUsuario(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/usuarios/username/${userName}`).pipe(delay(2000));
  }
  getConsultaCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
}
}
