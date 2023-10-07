import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.scss'],
})
export class NewVentaComponent implements OnInit {


  constructor(private modalC: ModalController, private navCtrl: NavController,
    private formb: FormBuilder, private toastController: ToastController) { }

  onSearchChange(event: any) {
    console.log('HOLA');

  }
  progress: number = 0;
  showProgressBar = false;

  

  productos = ['Sabritas', 'Azucar', 'Sal', 'Jugo', 'Galletas', 'Maruchan', 'Refresco', 'Gansito', 'Cerveza']


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

}
