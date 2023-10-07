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

  progress: number = 0;
  showProgressBar = false;

  ngOnInit() {
    this.productForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
   }

   updateProgress() {
    const totalFields = 8;
    const completedFields = Object.values(this.productForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  selectedFile: File | null = null;


  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
      // You can add more validations here, like checking the file type or size if needed
      // Save the selected file in a variable (for example, 'selectedFile')
      this.selectedFile = file;
    } else {
      // If no file is selected, mark the control as touched to trigger validation
      this.productForm.get('imagen')?.markAsTouched();
    }
  }

  categories = ['Abarrotes', 'Limpieza', 'Golosinas', 'Vinos y licores', 'Frutas y verduras', 'Panaderia']

  async closeModal() {
    await this.modalC.dismiss();
  }


  productForm: FormGroup = this.formb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    codigo: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    precio_adquirido: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    precio_de_venta: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    category_id: ['', [Validators.required]],
    stock: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
    imagen: ['', Validators.required],
    caducidad: ['', Validators.required],

  })



  validarInput(campo: string) {
    return this.productForm.controls[campo].errors && this.productForm.controls[campo].touched
  }

  saveProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productForm.reset();
      this.presentToast('middle');
      this.showProgressBar = false;
      this.updateProgress();
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

