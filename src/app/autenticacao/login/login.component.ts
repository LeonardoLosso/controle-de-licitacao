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

  hide = true;
  loginForm!: FormGroup;
  logando = false

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

    if (this.loginForm.valid) {
      const userName = this.loginForm.value.userName;
      const password = this.loginForm.value.senha;
      this.logando = true;
      this.authService.autenticar(userName, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
          this.loginForm.reset();
          this.logando = false;

        },
        error: () => {
          this.logando = false;
          const field = this.loginForm.get('senha');
          field?.setValue('');
          field?.updateValueAndValidity();
        },
      });
    }
  }
}
