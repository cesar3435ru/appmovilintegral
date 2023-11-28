import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static gananciaValida: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ganancias = control.get('ganacias')?.value;

    if (ganancias !== null) {
      if (ganancias <= 0) {
        return { gValida: 'La ganancia debe ser al menos 1 peso.' };
      } else if (ganancias > 100000) {
        return { gValida: 'La ganancia no puede superar las 100,000 pesos.' };
      }
    }

    return null;
  };


  static cantidadValida: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const cantidad = control.get('cantidad')?.value;

    if (cantidad !== null) {
      if (cantidad <= 0) {
        return { cValida: 'La cantidad debe ser al menos 1 unidad.' };
      } else if (cantidad > 5000) {
        return { cValida: 'La cantidad no puede superar las 5 mil unidades' };
      }
    }

    return null;
  };

  static totalValido: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const total = control.get('total')?.value;

    if (total !== null) {
      if (total <= 0) {
        return { tValido: 'El debe total ser al menos 1 peso.' };
      } else if (total > 100000) {
        return { tValido: 'El total no debe superar el millon de pesos.' };
      }
    }

    return null;
  };

  static stockValido(stock: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cantidad = control.get('cantidad')?.value;
      if (cantidad !== null) {
        if (cantidad > stock) {
          return { stockInvalido: 'No hay suficiente stock disponible' };
        }
      }
      return null;
    };
  }

}
