import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalImportacaoComponent } from '../shared/modal-importacao/modal-importacao.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent {

  constructor(private dialog: MatDialog, private router: Router) {}

  public abreModal(){
    const dialogRef = this.dialog.open(ModalImportacaoComponent, {
      data: {
        titulo: "Ata"
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result)
        this.goTo(result);
    })
  }

  private goTo(id: number): void {
    const queryParams = { ata: id };
    this.router.navigate(['/licitacao'], { queryParams });
  }
}