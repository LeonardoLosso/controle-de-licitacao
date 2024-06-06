import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/autenticacao/services/usuarios.service';
import { Permissoes, Recursos, Usuario } from 'src/app/core/types/usuarios';

@Component({
  selector: 'app-container-permissoes',
  templateUrl: './container-permissoes.component.html',
  styleUrls: ['./container-permissoes.component.scss']
})
export class ContainerPermissoesComponent implements OnInit {
  @Input() usuario!: Usuario
  private permissoes!: Permissoes[]

  constructor(private service: UsuariosService) { }

  ngOnInit(): void {
    this.service.ObterRecursos().subscribe({
      next: result => {
        this.permissoes = result;
        if (!this.usuario.Permissoes) {
          this.usuario.Permissoes = this.permissoes;
        }
      }
    });
  }

  togglePermissao(recurso: Recursos) {
    recurso.Permissao = !recurso.Permissao;
  }
}
