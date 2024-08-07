import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalImportacaoComponent } from '../shared/modal-importacao/modal-importacao.component';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent {

  constructor(private dialog: MatDialog) {}

  public abreModal(){
    this.dialog.open(ModalImportacaoComponent, {
      data: {
        titulo: "Ata"
      }
    })
  }
}