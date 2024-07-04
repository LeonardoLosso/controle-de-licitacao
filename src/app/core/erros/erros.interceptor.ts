import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { MensagemService } from '../services/mensagem.service';
import { UserService } from 'src/app/autenticacao/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrosInterceptor implements HttpInterceptor {

  constructor(
    private service: MensagemService, 
    private userService: UserService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro desconhecido';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro do client: ${error.error.message}`;
        } else if (error.status === 404) {
          errorMessage = `Recurso não encontrado`;
        } else if (error.status === 500) {
          errorMessage = `Erro interno do servidor`;
        } else if (error.status === 401) {
          errorMessage = `Não autorizado`;
        } else if (error.status === 0){
          errorMessage = 'Servidor off-line';
        } else if (error.status === 501){
          errorMessage = error.error?.Message;
        } else if (error.status === 400){
          errorMessage = 'Requisição fora do padrão';
        } else if (error.status === 512){
          errorMessage = "token expirado";
          this.userService.logout();
          this.router.navigate(['auth/login']);
          this.service.openSnackBar(errorMessage, 'error');
        }

        this.service.openSnackBar(errorMessage, 'error');

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
