import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  constructor(private modalC: ModalController) { }

  ngOnInit() { }

  async closeModal() {
    await this.modalC.dismiss();
  }

}
