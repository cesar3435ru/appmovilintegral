import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
import { ProductService } from 'src/app/services/product.service';
import { CustomValidators } from 'src/app/validators/ganancias.validator';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.scss'],
})
export class NewVentaComponent implements OnInit {

  popoverInfo: any;
  prod_id: number = 0;
  // stock: number = 0;
  stock = 0;
  mystock: number = 0;
  precio_venta: number = 0;
  precio_adquirido: number = 0;


  // popoverInfo: any = {};


  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController, private productS: ProductService, private popCt: PopoverController, private toast: ToastService

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


    this.ventaForm.get('cantidad')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined && value !== '') {
        const cantidad = parseFloat(value); // Convertir el valor de cadena a número
        if (!isNaN(cantidad)) {
          // Verificar que la conversión a número sea válida
          const resultado = cantidad * this.precio_venta; // Realizar la multiplicación
          this.ventaForm.get('total')?.patchValue(resultado); // Mostrar el resultado en el campo total
        }
      } else {
        this.ventaForm.get('total')?.patchValue(''); // Si la cantidad está vacía o nula, borrar el valor del total
      }
    });

    this.ventaForm.get('cantidad')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined && value !== '') {
        const cantidad = parseFloat(value); // Convertir el valor de cadena a número
        if (!isNaN(cantidad)) {
          // Verificar que la conversión a número sea válida

          const resultado = (cantidad * this.precio_venta) - (cantidad * this.precio_adquirido);// Realizar la multiplicación
          this.ventaForm.get('ganacias')?.patchValue(resultado); // Mostrar el resultado en el campo total
        }
      } else {
        this.ventaForm.get('ganacias')?.patchValue(''); // Si la cantidad está vacía o nula, borrar el valor del total
      }
    });


  }

  updateProgress() {
    const totalFields = 1;
    const completedFields = Object.values(this.ventaForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  async closeModal() {
    await this.modalC.dismiss();
  }

  ventaForm: FormGroup = this.formb.group({
    cantidad: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    total: [null, [Validators.required, Validators.min(1), Validators.max(100000)]],
    ganacias: [null, [Validators.required, Validators.min(1), Validators.max(100000)]],
    // prod_id: [null, Validators.required],
    aceptarVenta: [false, Validators.requiredTrue]
  },
    { validators: Validators.compose([CustomValidators.gananciaValida, CustomValidators.cantidadValida, CustomValidators.totalValido]) }
  );

  validarInput(campo: string) {
    return this.ventaForm.controls[campo].errors && this.ventaForm.controls[campo].touched
  }



  saveVenta() {
    if (this.ventaForm.valid) {
      const readyData = {
        prod_id: this.prod_id,
        cantidad: this.ventaForm.get('cantidad')!.value,
        total: this.ventaForm.get('total')!.value,
        ganacias: this.ventaForm.get('ganacias')!.value,
      };

      this.productS.doNewSale(readyData).subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp) {
            this.toast.mostrarToast('Producto agregado con éxito', 5000, 'top', 'success', 'checkmark-circle');
            this.showProgressBar = false;
            this.updateProgress();
            this.productS.ventaSubject.next();
            this.productS.getProductsSubject.next();
            this.productS.getProductVendidoSubject.next();
            this.closeModal();
            this.ventaForm.reset();
          }
        },
        (error: any) => {
          console.error('Error al hacer la venta:', error);
          this.toast.mostrarToast('No hay suficiente stock', 5000, 'top', 'danger', 'close');
          this.closeModal();
          this.ventaForm.reset();

        }
      );


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
      this.prod_id = info.data.item.id;
      this.precio_venta = info.data.item.precio_de_venta;
      this.stock = info.data.item.stock;
      console.log('STOCK DE PRODUCTO:', this.stock);
      this.precio_adquirido = info.data.item.precio_adquirido;
      console.log('Si llego la info', this.popoverInfo);
      console.log('ID', this.prod_id);
      console.log('PRECIO DE VENTA:', this.precio_venta);
      console.log('PRECIO ADQUIRIDO:', this.precio_adquirido);
      // console.log('STOCK DE PRODUCTO:', this.stock);

      const cantidadControl = this.ventaForm.get('cantidad') as FormControl;
      cantidadControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.stock) // Validacion para el valor maximo basado en el stock
      ]);
      cantidadControl.updateValueAndValidity();
    }

  }

  esCantidadMayor(cantidad: number): boolean {
    return cantidad < 15;
  }


}
