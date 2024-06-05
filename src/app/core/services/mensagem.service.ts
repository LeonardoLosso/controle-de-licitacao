import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {


  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
  }
}
