import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudBaseService } from 'src/app/core/services/crud-base.service';

import { Entidade, EntidadeSimplificada } from 'src/app/core/types/entidade';

@Injectable({
    providedIn: 'root'
})
export class EntidadesService extends CrudBaseService<Entidade, EntidadeSimplificada> {

    constructor(private http: HttpClient) { super() }

    public listar(): Observable<EntidadeSimplificada[]> {
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }

    public obterPorID(id: number): Observable<EntidadeSimplificada[]> {
        // IMPLEMENTAR
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }

    public inativar(id: number): Observable<EntidadeSimplificada[]> {
        // IMPLEMENTAR
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }

    public criar(cadastro: Entidade): Observable<EntidadeSimplificada[]> {
        // IMPLEMENTAR
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }

    public editar(cadastro: Entidade): Observable<EntidadeSimplificada[]> {
        // IMPLEMENTAR
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }
}
