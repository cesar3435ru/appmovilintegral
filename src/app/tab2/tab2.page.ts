import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { VerProductComponent } from '../components/ver-product/ver-product.component';
import { NewVentaComponent } from '../components/new-venta/new-venta.component';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  categories: any[] = [];

  constructor(
    private modal: ModalController,
    private http: ConfigService
  ) {
    this.http.getCategoryObservable().subscribe(() => {
      this.loadCategories();
    });
  }

  onSearchChange(event: any) {
    console.log('HOLA');

  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.http.listOfCategories().subscribe((data: any) => {
      this.categories = data
      console.log('mi data', this.categories);
    });
  }

  // ngOnDestroy(): void {
  //   this.categorySubscription.unsubscribe();
  // }
  async openNewProduct() {

    const md = await this.modal.create({
      component: NewProductComponent,
      mode: 'md'
    })

    await md.present();

  }

  async openNewSale() {

    const md = await this.modal.create({
      component: NewVentaComponent,
      mode: 'md',
      initialBreakpoint: .8,
      backdropDismiss: false
    })

    await md.present();

  }

  async viewProduct() {

    const md = await this.modal.create({
      component: VerProductComponent,
      mode: 'ios'
    })

    await md.present();

  }

  editProduct() {
    console.log('PROBANDO FUNCION');

  }


}
