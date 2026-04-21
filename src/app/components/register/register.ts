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
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule, AppFloatingConfigurator, TabsModule],
  templateUrl: './register.html'
})
export class Register {
  formRegister: FormGroup;
  activeTab: string = '0'; // '0' for Natural, '1' for Juridica

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      
      // Basic Persona fields
      nro_doc_per: ['', Validators.required],
      nombre_per: ['', Validators.required],
      apellido_pat_per: ['', Validators.required],
      
      // Persona Natural 
      primer_vivienda_natu: [false],
      ingresos_aprox_natu: [0],

      // Persona Juridica specific
      cargo_jur: ['',[Validators.required]],
      nombre_representante_jur: ['',[Validators.required]],
      registro_mercantil_ju: ['',[Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }

    const formValues = this.formRegister.value;

    const registerRequest: any = {
      email: formValues.email,
      password: formValues.password,
      estado_usu: 'ACTIVO',
      rol: 'USUARIO'
    };

    if (this.activeTab === '0') {
      registerRequest.personaNatural = {
        nro_doc_per: formValues.nro_doc_per,
        nombre_per: formValues.nombre_per,
        apellido_pat_per: formValues.apellido_pat_per,
        tipo_doc_per: 'DNI',
        apellido_mat_per: '',
        sexo_per: '',
        anio_nac_per: 2000,
        domicilio_per: '',
        cp_per: '',
        provincia_per: '',
        primer_vivienda_natu: formValues.primer_vivienda_natu,
        ingresos_aprox_natu: formValues.ingresos_aprox_natu
      };
    } else {
      registerRequest.personaJuridica = {
        nro_doc_per: formValues.nro_doc_per,
        nombre_per: formValues.nombre_per,
        apellido_pat_per: formValues.apellido_pat_per,
        tipo_doc_per: 'RUC',
        apellido_mat_per: '',
        sexo_per: '',
        anio_nac_per: 2000,
        domicilio_per: '',
        cp_per: '',
        provincia_per: '',
        cargo_jur: formValues.cargo_jur,
        nombre_representante_jur: formValues.nombre_representante_jur,
        registro_mercantil_ju: formValues.registro_mercantil_ju
      };
    }

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });
  }
}
