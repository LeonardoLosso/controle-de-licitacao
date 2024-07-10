import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

interface Mensagem {
  texto: string;
  tipo: 'alert' | 'error' | 'success' | 'info';
}

@Injectable({ providedIn: 'root' })
export class MensagemService {
  private filaMensagens: Mensagem[] = [];
  private snackBarRef: MatSnackBarRef<any> | null = null;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(texto: string, tipo: 'alert' | 'error' | 'success' | 'info' = 'alert') {
    this.filaMensagens.push({ texto, tipo });
    this.processarFila();
  }

  private processarFila() {
    if (!this.snackBarRef && this.filaMensagens.length > 0) {
      const mensagem = this.filaMensagens.shift();
      if (mensagem)
        this.mostrarSnackBar(mensagem.texto, mensagem.tipo);
    }
  }

  private mostrarSnackBar(message: string, pClass: 'alert' | 'error' | 'success' | 'info' = 'alert') {
    const panelClass = 'snack-bar-' + pClass;

    let duration = 1000;
    switch (panelClass) {
      case 'snack-bar-error':
        message = '⛔     ' + message;
        duration = 3000;
        break;
      case 'snack-bar-success':
        message = '✅     ' + message;
        break;
      case 'snack-bar-alert':
        message = '📢     ' + message;
        duration = 2000;
        break;
    }

    this.snackBarRef = this._snackBar.open(message, undefined, {
      duration: duration,
      panelClass: [panelClass]
    });

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.snackBarRef = null;
      this.processarFila();
    });
  }
}