import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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
    private formb: FormBuilder, private product: ProductService, private category: ConfigService, private alert: ToastService) { }

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
    if (this.productForm.invalid) return
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();

    // Agregar los campos de texto del formulario al FormData
    const data = this.productForm.getRawValue(); // Obtener los valores del formulario
    for (const dataKey in data) { // Recorrer los campos del formulario
      if (dataKey !== 'imagen') { // Excluir el campo de la imagen
        formData.append(dataKey, data[dataKey]); // Agregar otros campos al FormData
      }
    }
    // Agregar el archivo IMG al FormData, si hay un archivo seleccionado
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.product.addProduct(formData).subscribe(
      (response) => {
        this.product.setNewProduct(response); //Set el emitter
        console.log('Peticion exitosa:', response);
        this.alert.mostrarToast('Producto creado con éxito', 5000, 'top', 'success', 'checkmark-circle');
        // Restablecer el formulario después de enviar los datos
        this.productForm.reset();
        this.showProgressBar = false;
        this.updateProgress(); // Actualizar progreso después de guardar
        this.selectedFile = null; // Reiniciar la variable del archivo seleccionado

      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
        this.alert.mostrarToast('Error de registro', 5000, 'top', 'danger', 'close-circle-outline');
        this.productForm.reset();
        this.showProgressBar = false;
        this.updateProgress(); // Actualizar progreso después de guardar
        this.selectedFile = null; // Reiniciar la variable del archivo seleccionado
      }
    );
  }
  

}

