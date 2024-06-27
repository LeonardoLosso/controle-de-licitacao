import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as JWT from 'jwt-decode';

import { TokenService } from './token.service';
import { PessoaUsuaria } from 'src/app/core/types/usuarios';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = JWT.jwtDecode(token) as PessoaUsuaria;
    this.userSubject.next(user);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

  verificaPermissao(id: number): boolean{
    const user = this.userSubject.value;
    
    if(user)
      return user.recursos.some(rec => rec === id);

    return false;
  }
}
