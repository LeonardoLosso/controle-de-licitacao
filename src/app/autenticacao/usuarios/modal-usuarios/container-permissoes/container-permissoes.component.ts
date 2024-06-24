import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/autenticacao/services/usuarios.service';
import { Permissoes, Recursos, Usuario } from 'src/app/core/types/usuarios';

@Component({
  selector: 'app-container-permissoes',
  templateUrl: './container-permissoes.component.html',
  styleUrls: ['./container-permissoes.component.scss']
})
export class ContainerPermissoesComponent implements OnInit {
  @Input() usuario!: Usuario
  @Input() usuarioPermissoes!: FormControl<Permissoes[]>;
  private permissoes!: Permissoes[]

  constructor(private service: UsuariosService) { }

  ngOnInit(): void {
    this.service.ObterRecursos().subscribe({
      next: result => {
        this.permissoes = result;
        if (!this.usuario.permissoes || this.usuario.permissoes.length === 0) {
          this.usuario.permissoes = this.permissoes;
        }
      }
    });
  }

  togglePermissao(recurso: Recursos) {
    recurso.permissaoRecurso = !recurso.permissaoRecurso;
    this.usuarioPermissoes.setValue(this.usuario.permissoes);
    this.usuarioPermissoes.markAsDirty();
  }
}
