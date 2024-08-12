import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { AtaLicitacao, Empenho } from 'src/app/core/types/documentos';
import { environment } from 'src/environments/environment';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-modal-importacao',
  templateUrl: './modal-importacao.component.html',
  styleUrls: ['./modal-importacao.component.scss']
})
export class ModalImportacaoComponent extends SpinnerControlDirective {

  private URL = environment.apiUrl;
  private selectedFile!: File

  constructor(
    private dialogRef: MatDialogRef<ModalImportacaoComponent>,
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { super() }

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  async onFileSelected(event: Event) {
    event.preventDefault();
    if (this.selectedFile) {
      await this.uploadFile(this.selectedFile);
    }
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.mostrarSpinner();
    let result: any;
    try {
      if (this.data.titulo === 'Ata')
        result = await lastValueFrom(this.http.post<AtaLicitacao>(`${this.URL}/upload/ata`, formData));
      else
        result = await lastValueFrom(this.http.post<Empenho>(`${this.URL}/upload/empenho/${this.data.idBaixa}`, formData));
    }
    finally {
      this.esconderSpinner();
      if (result) {
        if ((await this.confirmarInativacao()))
          this.dialogRef.close(result.id);
      }
    }
  }
  private async confirmarInativacao() {
    const confirmacao = this.dialog.open(ModalConfirmacaoComponent, {
      disableClose: true,
      data: {
        titulo: 'Importação bem sucedida',
        mensagem: 'A importação foi um sucesso!',
        item: `\nPor favor revise e corrija os dados na proxima tela, se necessário`,
        info: true
      }
    });

    return await lastValueFrom(confirmacao.afterClosed());
  }

}
