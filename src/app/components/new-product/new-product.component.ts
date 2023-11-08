import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ConfigService } from 'src/app/services/config.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomValidators } from 'src/app/validators/comparar.validator';
import { CustomValidatonsCad } from 'src/app/validators/caducidad.validator';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  edit = false;
  //Boton de editar o guardar
  productId: number = 0;

  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private product: ProductService, private category: ConfigService, private alert: ToastService, private nParams: NavParams) {
    let info = this.nParams.get('datakey');
    if (info) {
      console.log(info);
      this.productForm.reset(info);
      this.edit = true;
      console.log('Valor: ', this.edit);
      this.productId = info.id; // Extrae el ID del objeto y almacénalo
      console.log('ID del producto:', this.productId);
    } else {
      this.edit = false;
      console.log('Valor: ', this.edit);
    }

  }

  mycategories: any[] = [];
  selectedFile: File | null = null;

  progress: number = 0;
  showProgressBar = false;
  requiresCaducidad: boolean = false;
  mostrarIcono = 'add'; // Icono a mostrar cuando se va a mostrar el campo de caducidad
  ocultarIcono = 'eye-off-outline';


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
    const totalFields = 7;
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
    precio_adquirido: [null, [Validators.required, Validators.min(1), Validators.max(20000)]],
    precio_de_venta: [null, [Validators.required, Validators.min(1), Validators.max(20000)]],
    cat_id: ['', [Validators.required]],
    stock: [null, Validators.required],
    imagen: ['', Validators.required],
    caducidad: [''], //Este campo es opcional

  },
    // { validators: CustomValidators.preciosComparar }
    { validators: Validators.compose([CustomValidators.preciosComparar, CustomValidators.stockValido, CustomValidatonsCad.caducidadValida]) }

  );

  validarInput(campo: string) {
    return this.productForm.controls[campo].errors && this.productForm.controls[campo].touched
  }


  toggleCaducidadInput() {
    this.requiresCaducidad = !this.requiresCaducidad;
  }
  



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

    if (this.edit) {
      this.product.editProduct(this.productId, this.productForm.value).subscribe(        
        (response) => {
          this.alert.mostrarToast('Actualización exitosa!!!', 5000, 'top', 'success', 'checkmark-circle');
          this.product.editProductSubject.next();
          this.closeModal();
        },
        (error)=>{
          this.alert.mostrarToast('Error al intentar actualizar!!!', 5000, 'top', 'danger', 'close-circle-outline');
        }
      )
      
      
    } else {
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
          this.closeModal();
        },
        (error) => {
          console.error('Error al enviar datos al backend:', error);
          this.alert.mostrarToast('Error de registro', 5000, 'top', 'danger', 'close-circle-outline');
          this.productForm.reset();
          this.showProgressBar = false;
          this.updateProgress(); 
          this.selectedFile = null;
        }
      );

    }

  }


}

