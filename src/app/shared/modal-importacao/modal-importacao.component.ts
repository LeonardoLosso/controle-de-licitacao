import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { SpinnerControlDirective } from 'src/app/core/diretivas/spinner-control.directive';
import { AtaLicitacao } from 'src/app/core/types/documentos';
import { environment } from 'src/environments/environment';

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
    try {
      const result = await lastValueFrom(this.http.post<AtaLicitacao>(`${this.URL}/upload/ata`, formData));
      if(result){
        this.dialogRef.close(result.id);
      }
    }
    finally{
      this.esconderSpinner();
    }
  }

  
}
