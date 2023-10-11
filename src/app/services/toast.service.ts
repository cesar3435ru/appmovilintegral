import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Options } from '../interfaces/options';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtr: ToastController) { }

  async generateToast(op: Options ){
    const toast = await this.toastCtr.create({
      message: op.message,
      position: op.position,
      icon: op.icon,
      color: op.color,
      duration: op.duration
    });
    await toast.present();
  }

  async mostrarToast(
    mensaje: string, 
    duracion: number, 
    posicion: 'top' | 'bottom' | 'middle', 
    color: string,
    icono: string = ''
    ) {
    const toast = await this.toastCtr.create({
      message: mensaje,
      duration: duracion,
      position: posicion,
      color: color,
      icon:icono
    });
    await toast.present();
  }
}
