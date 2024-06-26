import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      senha: [null, Validators.required]
    });
  }

  public login() {

    if(this.loginForm.valid) {
      const userName = this.loginForm.value.userName;
      const password = this.loginForm.value.senha;

      this.authService.autenticar(userName, password).subscribe({
          next: () => {
              this.router.navigateByUrl('/');
              this.loginForm.reset();
          },
          error: () => {
              
          },
      });
  }
  }
}
