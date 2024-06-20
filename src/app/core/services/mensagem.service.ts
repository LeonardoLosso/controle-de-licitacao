import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {


  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, pClass: 'alert' | 'error' | 'success' | 'info' = 'alert') {
    const panelClass = 'snack-bar-' + pClass;

    if (panelClass === 'snack-bar-error')
      message = '⛔     ' + message;

    if (panelClass === 'snack-bar-success')
      message = '✅     ' + message;

    if (panelClass === 'snack-bar-alert')
      message = '📢     ' + message;

    this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
