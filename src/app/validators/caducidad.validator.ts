// import { AbstractControl, ValidationErrors } from "@angular/forms";
// import * as moment from 'moment';



// export function caducidadValid(ctrl: AbstractControl): ValidationErrors | null {

//     const caducidad = ctrl?.get('expired')?.value;
//     console.log('caducidad', caducidad);

//     const fechaCaducidad = moment(caducidad);

//     const hoy = moment().format();

//     const fechaAnterior = fechaCaducidad.isBefore(hoy);

//     console.log(fechaAnterior);

//     if (fechaAnterior) {
//         console.log(fechaAnterior);
//         return ({ 'expiredError': true });
//     }

//     return (null);
// }

import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export class CustomValidatonsCad {
    static caducidadValida: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const caducidad = control?.get('caducidad')?.value;
        // console.log('caducidad', caducidad);

        const fechaCaducidad = moment(caducidad);

        const hoy = moment().format();

        const fechaAnterior = fechaCaducidad.isBefore(hoy);

        // console.log(fechaAnterior);

        if (fechaAnterior) {
            // console.log(fechaAnterior);
            return { expiredError: true };
        }

        return null;
    };
}
