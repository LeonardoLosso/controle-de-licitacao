import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;

  private URL = environment.apiUrl;


  constructor(private http: HttpClient) {}

  //  FAZER UMA MALDITA MODAL COM UM FORM E SEU ENCYPT TYPE
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      this.http.post<any>(`${this.URL}/ata/upload`, file)
        .subscribe({
          next: (value) => {
            console.log(value);
          }
        });
    }
  }
}


/*
constructor(private http: HttpClient) { }

  handleFileInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onFileSelected(event: Event): void {
    event.preventDefault();
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:5186/ata/upload', formData)
      .subscribe(
        {
          next: response => {
            console.log('Arquivo importado com sucesso!', response);
          },
          error: erro => {
            console.error('Erro ao importar o arquivo:', erro);
          }
        }
      );
  }
*/
/*
<form (submit)="onFileSelected($event)" enctype="multipart/form-data">
  <input type="file" (change)="handleFileInput($event)">
  <button type="submit">Importar</button>
</form>
 */