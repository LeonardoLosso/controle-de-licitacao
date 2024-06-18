import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {


  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, panelClass: string = 'snack-bar-info') {
    this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
