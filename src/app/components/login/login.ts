import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { Auth } from '@/app/service/auth';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule, AppFloatingConfigurator],
  templateUrl: './login.html'
})
export class Login {

  email: string = '';
  password: string = '';
  checked: boolean = false;

  formLogin: FormGroup 
  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) { 
    this.formLogin= this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['',Validators.minLength(8), Validators.required],
      checked: [false]
    });
  }

  ngOnInit(): void {
  }

  login() {
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    } 
    
    this.authService.login(this.formLogin.value).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.authService.setToken(response.token);
          if (response.usuario_dto) {
            this.authService.setUser(response.usuario_dto);
          }
          this.router.navigate(['/']);
        } else {
          console.log('Login exitoso pero no se recibió token:', response);
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
      }
    });
  }
}
