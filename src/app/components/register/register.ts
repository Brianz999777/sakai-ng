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
  isSubmitting: boolean = false; // Flag para evitar múltiples envíos

  get activeTab(): string {
    return this._activeTab;
  }
  set activeTab(value: string) {
    this._activeTab = value;
    this.updateValidators();
  }
  private _activeTab: string = '0';

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      
      // Basic Persona fields (snake_case mantenido)
      nro_doc_per: ['', Validators.required],
      nombre_per: ['', Validators.required],
      apellido_pat_per: ['', Validators.required],
      apellido_mat_per: [''],
      sexo_per: ['M'],
      anio_nac_per: [1990, Validators.required],
      domicilio_per: ['', Validators.required],
      cp_per: ['', Validators.required],
      provincia_per: ['', Validators.required],
      
      // Persona Natural specific
      primer_vivienda_natu: [false],
      ingresos_aprox_natu: [0],

      // Persona Juridica specific
      cargo_jur: [''],
      nombre_representante_jur: [''],
      registro_mercantil_ju: ['']
    }, { validators: this.passwordMatchValidator });

    this.updateValidators();
  }

  updateValidators() {
    const cargo = this.formRegister.get('cargo_jur');
    const representante = this.formRegister.get('nombre_representante_jur');
    const mercantil = this.formRegister.get('registro_mercantil_ju');
    const apellido = this.formRegister.get('apellido_pat_per');

    if (this.activeTab === '1') {
      cargo?.setValidators([Validators.required]);
      representante?.setValidators([Validators.required]);
      mercantil?.setValidators([Validators.required]);
      apellido?.clearValidators();
    } else {
      cargo?.clearValidators();
      representante?.clearValidators();
      mercantil?.clearValidators();
      apellido?.setValidators([Validators.required]);
    }

    cargo?.updateValueAndValidity();
    representante?.updateValueAndValidity();
    mercantil?.updateValueAndValidity();
    apellido?.updateValueAndValidity();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    // Si el formulario es inválido o ya se está enviando, no hacer nada
    if (this.formRegister.invalid || this.isSubmitting) {
      this.formRegister.markAllAsTouched();
      return;
    }

    this.isSubmitting = true; // Bloquear envíos adicionales

    const formValues = this.formRegister.value;

    const registerRequest: any = {
      email: formValues.email,
      password: formValues.password,
      estado_usu: 'ACTIVO',
      rol: 'USER'
    };

    const persona: any = {
      nro_doc_per: formValues.nro_doc_per,
      nombre_per: formValues.nombre_per,
      apellido_mat_per: formValues.apellido_mat_per,
      sexo_per: formValues.sexo_per,
      anio_nac_per: formValues.anio_nac_per,
      domicilio_per: formValues.domicilio_per,
      cp_per: formValues.cp_per,
      provincia_per: formValues.provincia_per
    };

    if (this.activeTab === '0') {
      persona.type = 'natural';
      persona.tipo_doc_per = 'DNI';
      persona.apellido_pat_per = formValues.apellido_pat_per;
      persona.primer_vivienda_natu = formValues.primer_vivienda_natu;
      persona.ingresos_aprox_natu = formValues.ingresos_aprox_natu;
    } else {
      persona.type = 'juridica';
      persona.tipo_doc_per = 'RUC';
      persona.apellido_pat_per = '';
      persona.cargo_jur = formValues.cargo_jur;
      persona.nombre_representante_jur = formValues.nombre_representante_jur;
      persona.registro_mercantil_ju = formValues.registro_mercantil_ju;
    }

    registerRequest.persona = persona;

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isSubmitting = false; // Liberar bloqueo en caso de error
        console.error('Error en el registro:', error);
      }
    });
  }
}