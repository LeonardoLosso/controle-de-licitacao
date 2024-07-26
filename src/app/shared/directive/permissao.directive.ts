import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { UserService } from '../../autenticacao/services/user.service';

@Directive({
  selector: '[appHasPermission]'
})
export class PermissaoDirective implements OnInit, OnChanges {
  @Input() appHasPermission!: number;
  @Output() hasPermission = new EventEmitter<boolean>();

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHasPermission']) {
      if (changes['appHasPermission'].currentValue) {
        this.hasPermission.emit(this.userService.verificaPermissao(changes['appHasPermission'].currentValue));
      }
    }
  }
  ngOnInit(): void {
    if (this.appHasPermission) {
      this.hasPermission.emit(this.userService.verificaPermissao(this.appHasPermission));
    }
  }
}
