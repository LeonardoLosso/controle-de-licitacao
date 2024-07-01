import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../autenticacao/services/user.service';

@Directive({
  selector: '[appHasPermission]'
})
export class PermissaoDirective implements OnInit {
  @Input() appHasPermission!: number;
  @Output() hasPermission = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.appHasPermission) {
      this.hasPermission.emit(this.userService.verificaPermissao(this.appHasPermission));
    }
  }
}
