import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";



export class FormUtils {

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

}
