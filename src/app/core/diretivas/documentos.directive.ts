import { Directive, HostListener } from '@angular/core';

import { SpinnerControlDirective } from './spinner-control.directive';
import { ModalControllService } from '../services/modal-controll.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Directive({})
export class DocumentosDirective extends SpinnerControlDirective {
  public aba = new FormControl(0);

  public isModalOpen = false;
  private modalSubscription!: Subscription;
  constructor(public modalControlService: ModalControllService) {
    super()
    this.modalSubscription = this.modalControlService.isModalOpen$.subscribe(
      (isOpen) => {
        this.isModalOpen = isOpen;
      }
    );
  }
  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  // @HostListener('document:keydown.enter', ['$event'])
  // onEnter(event: KeyboardEvent) {
  //   event.preventDefault();
  // }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (!this.isModalOpen) {
      if (event.key === '+') {
        this.acaoAdd();
      } else if (event.key === 'Delete') {
        this.acaoDelete();
      } else if (event.ctrlKey && event.altKey && event.key === 'ArrowRight') {
        this.acaoMudaTab(0);
      } else if (event.ctrlKey && event.altKey && event.key === 'ArrowLeft') {
        this.acaoMudaTab(1);
      } else if (event.key === 'Escape') {
        this.cancelarClick();
      }
    }
  }
  protected acaoAdd() { }
  protected acaoDelete() { }
  protected async cancelar() { }

  private acaoMudaTab(tab: number): void {
    if (this.aba.value !== 1) {
      this.aba.setValue(1)
    } else this.aba.setValue(0)
  }
  private async cancelarClick() {
    this.modalControlService.openModal();
    await this.cancelar();
    this.modalControlService.closeModal();
  }
}
