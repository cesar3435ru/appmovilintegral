import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() { }

  categories = ['Abarrotes', 'Limpieza', 'Golosinas', 'Vinos y licores', 'Frutas y verduras', 'Panaderia']

  async closeModal() {
    await this.modalC.dismiss();
  }


  productForm: FormGroup = this.formb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    codeproduct: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.maxLength(100)]],
    precio: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    // inventory: [null, [Validators.required, Validators.min(1),Validators.max(5000), Validators.pattern(this.priceP)]],
    category_id: ['', [Validators.required]],
    stock: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
    imagen: ['', [Validators.required, Validators.maxLength(200)]],
    // mark: ['', [Validators.required, Validators.maxLength(30)]],
    adquisicion: ['', Validators.required],
    vencimiento: ['', Validators.required],

  })



  validarInput(campo: string) {
    return this.productForm.controls[campo].errors && this.productForm.controls[campo].touched
  }

  saveProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productForm.reset();
      this.presentToast('middle');
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Registro exitoso!',
      duration: 1500,
      position: position,
      icon: 'checkmark-done-outline',
      color: 'success'
    });

    await toast.present();
  }

}

