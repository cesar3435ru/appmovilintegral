import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { VerProductComponent } from '../components/ver-product/ver-product.component';
import { NewVentaComponent } from '../components/new-venta/new-venta.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  categorias = ['Abarrotes','Frutas y Verduras','Limpieza', 'Vinos y Licores','Especias','Golosinas']

  constructor(
    private modal: ModalController
  ) {}

  onSearchChange(event: any){
    console.log('HOLA');
    
  }
  async openNewProduct(){

    const md = await this.modal.create({
      component: NewProductComponent,
      mode: 'md'
    })

    await md.present();

  }

  async openNewSale(){

    const md = await this.modal.create({
      component: NewVentaComponent,
      mode: 'md',
      initialBreakpoint: .8,
      backdropDismiss: false
    })

    await md.present();

  }

  async viewProduct(){

    const md = await this.modal.create({
      component: VerProductComponent,
      mode: 'ios'
    })

    await md.present();

  }

  editProduct(){
    console.log('PROBANDO FUNCION');
    
  }


}
