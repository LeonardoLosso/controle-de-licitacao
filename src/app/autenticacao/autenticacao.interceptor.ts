import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './services/token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.tokenService.possuiToken()) {
            const token = this.tokenService.retornarToken();
            request = request.clone({
                headers: request.headers.append('Authorization', `Bearer ${token}`)
            });

            if (!(request.body instanceof FormData)) {
                request = request.clone({
                    headers: request.headers.append('Content-Type', 'application/json')
                });
            }
        }
        return next.handle(request);
    }
}
