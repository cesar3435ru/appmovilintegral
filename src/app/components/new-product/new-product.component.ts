import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ConfigService } from 'src/app/services/config.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController, private product: ProductService, private category: ConfigService, private alert: ToastService) { }

  mycategories: any[] = [];
  selectedFile: File | null = null;

  progress: number = 0;
  showProgressBar = false;

  ngOnInit() {
    this.productForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
    this.getCategories();
  }

  getCategories() {
    this.category.listOfCategories().subscribe((data: any) => {
      this.mycategories = data
      console.log('All categories', this.mycategories);
    });
  }



  updateProgress() {
    const totalFields = 8;
    const completedFields = Object.values(this.productForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

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


  async closeModal() {
    await this.modalC.dismiss();
  }


  productForm: FormGroup = this.formb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    codigo: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    precio_adquirido: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    precio_de_venta: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
    cat_id: ['', [Validators.required]],
    stock: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
    imagen: ['', Validators.required],
    caducidad: ['', Validators.required],

  })



  validarInput(campo: string) {
    return this.productForm.controls[campo].errors && this.productForm.controls[campo].touched
  }

  // saveProduct() {
  //   if (this.productForm.valid) {
  //     console.log(this.productForm.value);
  //     this.productForm.reset();
  //     this.presentToast('middle');
  //     this.showProgressBar = false;
  //     this.updateProgress();
  //   }
  // }

  saveProduct() {
    if(this.productForm.invalid) return
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();

    //Agrega los datos del form
    formData.append('nombre', this.productForm.get('nombre')?.value);
    formData.append('codigo', this.productForm.get('codigo')?.value);
    formData.append('caducidad', this.productForm.get('caducidad')?.value);
    formData.append('stock', this.productForm.get('stock')?.value);
    formData.append('cat_id', this.productForm.get('cat_id')?.value);
    formData.append('precio_de_venta', this.productForm.get('precio_de_venta')?.value);
    formData.append('precio_adquirido', this.productForm.get('precio_adquirido')?.value);

    // Agregar el archivo IMG al FormData, si hay un archivo seleccionado
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.product.addProduct(formData).subscribe(
      (response) => {
        // Procesar la respuesta del backend si es necesario
        console.log('Respuesta del backend:', response);
        this.alert.mostrarToast('Categoría creada con éxito', 5000, 'top', 'success', 'checkmark-circle');
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
      }
    );

    // Restablecer el formulario después de enviar los datos
    this.productForm.reset();
    this.showProgressBar = false;
    this.updateProgress(); // Actualizar progreso después de guardar
    this.selectedFile = null; // Reiniciar la variable del archivo seleccionado
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

