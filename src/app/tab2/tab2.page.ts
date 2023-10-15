import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { VerProductComponent } from '../components/ver-product/ver-product.component';
import { NewVentaComponent } from '../components/new-venta/new-venta.component';
import { ConfigService } from '../services/config.service';
import { NewCategoriaComponent } from '../components/new-categoria/new-categoria.component';
import { AddProductoComponent } from '../components/add-producto/add-producto.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  categories: any[] = [];
  respaldocategories: any[] = [];
  vermas = true;

  constructor(
    private modal: ModalController,
    private http: ConfigService
  ) {
    this.http.getCategoryObservable().subscribe(() => {
      this.loadCategories();
    });
    //Agrega la nueva categoria
    // this.http.getNewCategory.subscribe(category => {
    //   if(category){
    //     // this.loadCategories();
    //     this.categories.push(category)
    //   }
    // })
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
      this.respaldocategories = data;
      this.categories = this.categories.slice(0, 6);
      console.log('My six categories', this.categories);
      console.log('All categories', this.respaldocategories);
    });
  }
  verMas() {
    this.vermas = false;
    this.categories = this.respaldocategories;
  }
  verMenos() {
    this.vermas = true;
    this.categories = this.categories.slice(0, 6);
  }

  async openNewProduct() {

    const md = await this.modal.create({
      component: NewProductComponent,
      mode: 'md'
    })

    await md.present();

  }
  async abrirFProducto() {

    const md = await this.modal.create({
      component: AddProductoComponent,
      mode: 'ios'
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

  async openNewCategoria() {

    const md = await this.modal.create({
      component: NewCategoriaComponent,
      mode: 'md',
      initialBreakpoint: .5,
      backdropDismiss: false
    })

    await md.present();

  }

  editProduct() {
    console.log('PROBANDO FUNCION');

  }


}
