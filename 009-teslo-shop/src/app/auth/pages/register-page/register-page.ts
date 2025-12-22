import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder)
  hasError = signal(false)
  AuthService = inject(AuthService)
  creationStatus = signal(false)

  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit(){
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return
    }
    const { fullName = '', email = '', password = ''} = this.registerForm.value;
    this.AuthService.register(fullName!, email!, password!).subscribe( isCreated => {

      if (isCreated) {
        this.creationStatus.set(true);
        setTimeout(() => this.creationStatus.set(false), 2000);
        return
      }
      this.hasError.set(true);
      this.creationStatus.set(false);
      setTimeout(() => this.hasError.set(false), 2000);
    })
  }

}
