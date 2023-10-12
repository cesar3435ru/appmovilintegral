import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Options } from 'src/app/interfaces/options';
import { ConfigService } from 'src/app/services/config.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.scss'],
})
export class NewCategoriaComponent implements OnInit {

  constructor(private modalC: ModalController, private formb: FormBuilder, private http: ConfigService, private alertS: ToastService) {}
  progress: number = 0;
  showProgressBar = false;

  colores = ['primary', 'secondary', 'success', 'warning', 'light', 'danger', 'tertiary', 'dark', 'medium']

  toastOptions: Options = {
    message: 'Registro exitoso bb',
    position: 'top',
    icon: 'cloud-done-outline',
    color: 'success',
    duration: 5000
  };

  ngOnInit() {
    this.categoryForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
  }



  updateProgress() {
    const totalFields = 2;
    const completedFields = Object.values(this.categoryForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  async closeModal() {
    await this.modalC.dismiss();
  }

  categoryForm: FormGroup = this.formb.group({
    nombre: ['', [Validators.required, Validators.maxLength(20)]],
    color: [null, [Validators.required]],
  })

  validarInput(campo: string) {
    return this.categoryForm.controls[campo].errors && this.categoryForm.controls[campo].touched
  }

  // saveCategory() {
  //   if (this.categoryForm.valid) {
  //     console.log(this.categoryForm.value);
  //     this.categoryForm.reset();
  //     this.presentToast('middle');
  //     this.showProgressBar = false;
  //     this.updateProgress();
  //   }
  // }

  saveCategory() {
    const formData = new FormData();
    formData.append('nombre', this.categoryForm.get('nombre')?.value);
    formData.append('color', this.categoryForm.get('color')?.value);

    this.http.addCategory(formData).subscribe(
      (response) => {
        // this.http.setNewCategory(response); //Set el emitter

        console.log('Respuesta del backend:', response);
        this.categoryForm.reset();
        this.alertS.generateToast(this.toastOptions); //Forma uno
        // this.alertS.mostrarToast('Categoría creada con éxito', 5000, 'top','success', 'checkmark-circle'); //Forma dos
        this.showProgressBar = false;
        this.updateProgress();
        this.http.categorySubject.next();
      },
      (error) => {
        console.error('Error al enviar datos al backend:', error);
      }
    );
  }


}
