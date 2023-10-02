import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-product',
  templateUrl: './ver-product.component.html',
  styleUrls: ['./ver-product.component.scss'],
})
export class VerProductComponent  implements OnInit {

  constructor(private modalC: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalC.dismiss();
  }


}
