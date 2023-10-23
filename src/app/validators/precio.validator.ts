import { AbstractControl, ValidationErrors } from '@angular/forms'
export function validarPrecio(ctrl: AbstractControl): ValidationErrors | null {
    const precio = ctrl?.get('precio_adquirido')?.value;
    const precioV = ctrl?.get('precio_de_venta')?.value;

    if (precioV <= precio) {
        console.log('No es valido');
        return ({ 'ErrorPrecio': true });
    }
    return null;
}