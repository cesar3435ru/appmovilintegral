import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.scss'],
})
export class NewVentaComponent  implements OnInit {

  constructor(private modalC: ModalController) { }

  ngOnInit() {}

  onSearchChange(event: any){
    console.log('HOLA');
    
  }

  async closeModal() {
    await this.modalC.dismiss();
  }

}
