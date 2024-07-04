import { Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@Directive({
  selector: '[appSpinnerControl]'
})
export abstract class SpinnerControlDirective {
  @ViewChild('loadingSpinnerContainer', { read: ViewContainerRef }) loadingSpinnerContainer!: ViewContainerRef;

  constructor() { }


  protected mostrarSpinner() {
    this.loadingSpinnerContainer.createComponent(LoadingSpinnerComponent);
  }

  protected esconderSpinner() {
    this.loadingSpinnerContainer.clear();
  }
}
