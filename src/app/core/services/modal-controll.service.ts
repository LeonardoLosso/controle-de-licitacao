import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalControllService {

  constructor() { }

  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  public isModalOpen$ = this.modalOpenSubject.asObservable();

  openModal(): void {
    this.modalOpenSubject.next(true);
  }

  closeModal(): void {
    this.modalOpenSubject.next(false);
  }
}
