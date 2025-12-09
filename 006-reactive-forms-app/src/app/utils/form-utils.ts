import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";


async function sleep() {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}


export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`
        case 'email':
          return 'El valor ingresado no es un email válido.'
        case 'emailTaken':
          return 'El email ya está en uso.'
        case 'notStrider':
          return 'El nombre de usuario no puede ser "strider".'
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no es un email válido.'
          }
          return 'El valor ingresado no cumple con el formato requerido.'
        default:
          return `Error de validación no controlado ${key}`
      }
    }
    return null
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    )
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null

    const errors = form.controls[fieldName].errors ?? {}

    return FormUtils.getTextError(errors)
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors &&
      formArray.controls[index].touched
    )
  }


  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null

    const errors = formArray.controls[index].errors ?? {}

    return FormUtils.getTextError(errors)
  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return ( formGroup: AbstractControl) => {
      const field1value = formGroup.get(fieldOne)?.value;
      const field2value = formGroup.get(fieldTwo)?.value;

      return field1value === field2value ? null : { passwordsNotMatch: true}
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value?.trim().toLowerCase();
    return value === 'strider' ? { notStrider: true } : null;
  }

}
