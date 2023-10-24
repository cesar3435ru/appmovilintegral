import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static preciosComparar: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const precioAdquirido = control.get('precio_adquirido')?.value;
    const precioVenta = control.get('precio_de_venta')?.value;

    if (precioAdquirido !== null && precioVenta !== null && precioVenta <= precioAdquirido) {
      return { preciosComparar: true };
    }

    return null;
  };


  static stockValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const stock = control.get('stock')?.value;

    //   if (stock !== null && (stock <= 0 || isNaN(stock))) {
    //     return { stockValido: true };
    //   }

    //   return null;
    // };
    // isNaN(42);        // false (42 is a number)
    // isNaN("42");      // false (can be converted to a number)
    // isNaN("Hello");   // true (cannot be converted to a number)
    // isNaN(true);      // false (can be converted to 1, which is a number)

    if (stock !== null) {
      if (stock <= 0) {
        return { stockValido: 'El stock debe ser al menos 1 unidad.' };
      } else if (stock > 100) {
        return { stockValido: 'El stock no puede superar las 100 unidades.' };
      }
    }

    return null;
  };
}
