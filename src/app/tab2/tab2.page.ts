import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { VerProductComponent } from '../components/ver-product/ver-product.component';
import { NewVentaComponent } from '../components/new-venta/new-venta.component';
import { ConfigService } from '../services/config.service';
import { NewCategoriaComponent } from '../components/new-categoria/new-categoria.component';

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

  // ngOnInit(): void {
  //   this.loadCategories();
  // }

  

  // loadCategories() {
  //   this.http.listOfCategories().subscribe((data: any) => {
  //     this.categories = data
  //     console.log('mi data', this.categories);
  //   });
  // }

  groupedCategories: any[] = [];
  showAll = false;


  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.http.listOfCategories().subscribe((data: any) => {
      this.categories = data;
      console.log('mi data', this.categories);
      this.groupedCategories = this.chunkCategories(this.categories, 3).slice(0, 2); // Limita a 2 filas de 3 botones
    });
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    if (this.showAll) {
      this.groupedCategories = this.chunkCategories(this.categories, 3); // Muestra todas las categorías
    } else {
      this.groupedCategories = this.chunkCategories(this.categories, 3).slice(0, 2); // Limita a 2 filas de 3 botones
    }
  }

  chunkCategories(arr: any[], size: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
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

  async openNewCategoria(){

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
