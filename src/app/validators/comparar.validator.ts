import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static preciosComparar(control: AbstractControl): ValidationErrors | null {
        const precioCompra = control.get('precio_adquirido')?.value;
        const precioVenta = control.get('precio_de_vetna')?.value;

        if (precioCompra <= precioVenta) {
            console.log('No es valido');
            return ({ 'ErrorPrecio': true });
        }
        return null;

    }

}   