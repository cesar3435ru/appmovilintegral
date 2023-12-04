import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { VerProductComponent } from '../components/ver-product/ver-product.component';
import { NewVentaComponent } from '../components/new-venta/new-venta.component';
import { ConfigService } from '../services/config.service';
import { NewCategoriaComponent } from '../components/new-categoria/new-categoria.component';
import { AddProductoComponent } from '../components/add-producto/add-producto.component';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';
import { FilterProductsComponent } from '../components/filter-products/filter-products.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  respaldocategories: any[] = [];
  filteredCategoryId: number | null = null; // ID de categoría filtrada

  vermas = true;

  constructor(
    private modal: ModalController,
    private http: ConfigService,
    private productS: ProductService,
    private alert: ToastService,
    private alertController: AlertController,
    private popCt: PopoverController
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
    this.productS.getNewProduct.subscribe(product => {
      if (product) {
        this.products.push(product)
        this.getProducts();
      }
    });
    this.productS.getEditedProductAsAObservable().subscribe(() => {
      this.getProducts();
    });

    this.getProducts();
    this.loadCategories();
    //Actualiza de forma automatica cuando se elimina un elemento
    this.productS.getDeletedProductObservable().subscribe(() => {
      this.getProducts();
    });

    //Segunda forma
    // this.productS.deleteProduct.subscribe(product => {
    //   if (product) {
    //     this.products.pop()
    //     this.getProducts();
    //   }
    // })

  }


  ngOnInit(): void {
  }

  getProducts() {
    this.productS.getProducts().subscribe((resp: any) => {
      this.products = resp;
      this.products.reverse();
      console.log('Mis productos', this.products);
    });
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

  //   async openEditProduct(prod: any) {

  //   const md = await this.modal.create({
  //     component: NewProductComponent,
  //     mode: 'md',
  //     componentProps:{
  //       datakey:prod
  //     }
  //   })

  //   await md.present();

  // }

  async openEditProduct(prod: any) {

    const md = await this.modal.create({
      component: AddProductoComponent,
      mode: 'md',
      componentProps: {
        datakey: prod
      }
    })

    await md.present();

  }

  deleteProduct(id: number) {
    this.productS.deleteProductById(id).subscribe(
      (resp) => {
        console.log(resp);
        this.alert.mostrarToast('Producto eliminado con éxito', 5000, 'top', 'success', 'checkmark-circle');
        this.productS.deleteProductSubject.next();
        // this.productS.removeProduct(resp); //Ejecuta el emitter
      },
      (error) => {
        console.error('Error:', error);
        this.alert.mostrarToast('Fallo al eliminar el producto', 5000, 'top', 'danger', 'close-circle-outline');

      }
    );
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Action canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Action confirmed');
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  async confirmDeleteProduct(id: number) {
    const alert = await this.alertController.create({
      header: 'Favor de confirmar',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: this.alertButtons,
    });

    await alert.present();

    alert.onDidDismiss().then((result) => {
      if (result.role === 'confirm') {
        // El usuario confirma la eliminación, procede a eliminar el producto.
        this.deleteProduct(id);
      }
    });
  }


  showMyProducts(e: any) {
    console.log(e.detail.value);
  }

  // filterProductsByCategory(id: number){
  //   console.log('PROBANDO FUNCION:', id);
  //   this.filteredProducts = this.products.filter(product => product.cat_id === id);
  //   console.log(this.filteredProducts);
  // }


  // Función para obtener los productos según la categoría seleccionada o todos si no hay filtro
  getDisplayedProducts() {
    return this.filteredCategoryId ? this.products.filter(product => product.cat_id === this.filteredCategoryId) : this.products;
  }


  // En tu controlador/componente
  filterTimeout: any; // Variable para almacenar el temporizador

  // Función para limpiar el filtro después de 2 minutos
  resetFilter() {
    this.filteredCategoryId = null; // Limpiar el filtro
  }

  // Función para filtrar productos por category_id
  filterProductsByCategory(categoryId: number) {
    this.filteredCategoryId = categoryId === this.filteredCategoryId ? null : categoryId;

    // Limpiar el filtro después de 2 minutos
    clearTimeout(this.filterTimeout); // Limpiar el temporizador existente si hay alguno
    this.filterTimeout = setTimeout(() => {
      this.resetFilter();
    }, 10000); // 120000 milisegundos = 2 minutos
  }


}
