import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntidadeSimplificada } from 'src/app/core/types/entidade';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EntidadesService {

    private URL: string = environment.apiUrl;
    constructor(private http: HttpClient) { }

    listar(): Observable<EntidadeSimplificada[]>{
        return this.http.get<EntidadeSimplificada[]>(`${this.URL}/entidades`);
    }
}
