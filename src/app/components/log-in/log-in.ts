import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@/app/service/auth';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule,
    AppFloatingConfigurator,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DividerModule,
    FloatLabelModule,
    RippleModule,
    RouterLink
],
  templateUrl: './log-in.html'
})
export class LogIn {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      checked: [false]
    });
  }

  login() {

    
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const formValues = this.formLogin.value;

    const loginRequest: any = {
      email: formValues.email,
      password: formValues.password
    };
    console.log(loginRequest);
    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/register']);
      },
      error: (error) => {
        console.error('Error en el login:', error);
      }
    });
  }
  

}
