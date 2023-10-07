import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styleUrls: ['./new-categoria.component.scss'],
})
export class NewCategoriaComponent implements OnInit {

  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController) { }

  progress: number = 0;
  showProgressBar = false;

  colores = ['Primary', 'Secondary', 'Success', 'Warning', 'Light', 'Danger','Tertiary','Dark','Medium']


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
    color_id: [null, [Validators.required]],
  })

  validarInput(campo: string) {
    return this.categoryForm.controls[campo].errors && this.categoryForm.controls[campo].touched
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryForm.reset();
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
