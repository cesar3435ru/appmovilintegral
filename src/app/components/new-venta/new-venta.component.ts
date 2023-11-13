import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.scss'],
})
export class NewVentaComponent implements OnInit {

  popoverInfo: any;
  // popoverInfo: any = {};

  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController, private productS: ProductService, private popCt: PopoverController

  ) {
    this.getProducts();
    this.productS.getProducts().subscribe(
      (prod: any) => { this.products = prod });
  }


  products: any[] = [];

  progress: number = 0;
  showProgressBar = false;



  productos = ['Sabritas', 'Azucar', 'Sal', 'Jugo', 'Galletas', 'Maruchan', 'Refresco', 'Gansito', 'Cerveza']


  getProducts() {
    this.productS.getProducts().subscribe((resp: any) => {
      this.products = resp;
      this.products.reverse();
      console.log('Mis productos', this.products);
    });
  }
  ngOnInit() {
    this.ventaForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
  }

  updateProgress() {
    const totalFields = 5;
    const completedFields = Object.values(this.ventaForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  async closeModal() {
    await this.modalC.dismiss();
  }

  ventaForm: FormGroup = this.formb.group({
    cantidad: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    total: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    ganancias: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    prod_id: [null, Validators.required],
    hora: [null, Validators.required],
  })

  validarInput(campo: string) {
    return this.ventaForm.controls[campo].errors && this.ventaForm.controls[campo].touched
  }

  saveVenta() {
    if (this.ventaForm.valid) {
      console.log(this.ventaForm.value);
      this.ventaForm.reset();
      this.presentToast('middle');
      this.showProgressBar = false;
      this.updateProgress();
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Venta exitoso!',
      duration: 1500,
      position: position,
      icon: 'checkmark-done-outline',
      color: 'success'
    });

    await toast.present();
  }

  showMyProducts(e: any) {
    const busqueda = e.detail.value;
    const filtrados: any[] = this.products.filter(
      prod => prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    console.log(e.detail.value);
    this.presentPopover(filtrados);
  }

  async presentPopover(data: any) {
    const pop = await this.popCt.create({
      component: FilterProductsComponent,
      event: data,
      side: 'right',
      componentProps: { products: data }
    });
    await pop.present();

    const info = await pop.onWillDismiss();
    if (info) {
      this.popoverInfo = info.data.item;
      console.log('Si llego la info', info);
    }

  }

}
