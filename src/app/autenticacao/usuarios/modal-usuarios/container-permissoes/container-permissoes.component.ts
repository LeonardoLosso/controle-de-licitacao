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
  @Input() usuarioPermissoes!: FormControl<Permissoes[] | null>;
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

  checaDisabled(recurso: Recursos, permissao: Permissoes): boolean {
    if(recurso.nomeRecurso === 'Visualizar'){
      return permissao.recursos.some(s => s.permissaoRecurso === true && s.nomeRecurso !== 'Visualizar');
    }
    return false;
  }
  togglePermissao(recurso: Recursos, permissao: Permissoes) {
    recurso.permissaoRecurso = !recurso.permissaoRecurso;

    if (permissao.recursos.some(s => s.permissaoRecurso === true)) {
      permissao.recursos[0].permissaoRecurso = true;
    }

    this.usuarioPermissoes.markAsDirty();
    this.usuarioPermissoes.setValue(this.usuario.permissoes);
  }
}
