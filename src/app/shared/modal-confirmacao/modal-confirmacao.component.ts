import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensagemModal } from 'src/app/core/types/auxiliares';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MensagemModal
  ) { }
}
