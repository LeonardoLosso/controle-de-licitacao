import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudBaseService } from 'src/app/core/services/crud-base.service';
import { Listagem, MudancasParaPatch } from 'src/app/core/types/auxiliares';
import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';

@Injectable({
    providedIn: 'root'
})
export class EntidadesService extends CrudBaseService<Entidade, EntidadeSimplificada> {

    constructor(private http: HttpClient) { super() }

    public listar(pagina?: number, parametros?: { key: string, value: any }[]): Observable<Listagem<EntidadeSimplificada>> {
        let params = new HttpParams();

        if (pagina) params = params.append('pagina', pagina);
        if (parametros) {
            parametros.forEach(param => {
                if (param.value != null) {
                    params = params.append(param.key, param.value);
                }
            });
        }
        return this.http.get<Listagem<EntidadeSimplificada>>(`${this.URL}/entidades`, { params });
    }

    public obterPorID(id: number): Observable<Entidade> {
        return this.http.get<Entidade>(`${this.URL}/entidades/${id}`);
    }

    public inativar(entidade: EntidadeSimplificada): Observable<Entidade> {
        const id = entidade.id;
        const novoValor = entidade.status === 1 ? '2' : '1';
        const status = {
            op: "replace",
            path: "/status",
            value: novoValor
        }
        return this.http.patch<Entidade>(`${this.URL}/entidades/status/${id}`, [status]);
    }

    public criar(cadastro: Entidade): Observable<Entidade> {
        return this.http.post<Entidade>(`${this.URL}/entidades`, cadastro);
    }

    public editar(patch: MudancasParaPatch[], id: number): Observable<Entidade> {
        return this.http.patch<Entidade>(`${this.URL}/entidades/${id}`, patch);
    }
    getConsultaCep(cep: string) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
    }
}
