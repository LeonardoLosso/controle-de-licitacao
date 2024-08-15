import { Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@Directive({})
export abstract class SpinnerControlDirective {
  @ViewChild('loadingSpinnerContainer', { read: ViewContainerRef }) loadingSpinnerContainer!: ViewContainerRef;

  constructor() { }


  protected mostrarSpinner(mensagem?: string) {
    var compRef = this.loadingSpinnerContainer.createComponent(LoadingSpinnerComponent);
    if (mensagem)
      compRef.instance.mensagem = mensagem;
  }

  protected esconderSpinner() {
    this.loadingSpinnerContainer.clear();
  }
}
