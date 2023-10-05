import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.scss'],
})
export class NewCategoriaComponent  implements OnInit {

  constructor(private modalC: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalC.dismiss();
  }

}
