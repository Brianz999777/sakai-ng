import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@/app/service/auth.service';
import { UserDTO } from '@/app/interfaces/user-dto';
import { TopbarWidget } from '@/app/pages/landing/components/topbarwidget.component';
import { FooterWidget } from '@/app/pages/landing/components/footerwidget';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Validador personalizado: la contraseña debe tener exactamente 1 carácter especial
 * y solo letras, números y ese carácter especial.
 * Coincide con el @Pattern del backend:
 *   ^(?=[^!@#$%^&*]*[!@#$%^&*][^!@#$%^&*]*$)[A-Za-z0-9!@#$%^&*]+$
 */
function passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  // Debe tener exactamente 1 carácter especial del conjunto !@#$%^&*
  const specialChars = value.match(/[!@#$%^&*]/g);
  if (!specialChars || specialChars.length !== 1) {
    return { passwordPattern: true };
  }
  // Solo debe contener letras, números y ese carácter especial
  if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(value)) {
    return { passwordPattern: true };
  }
  return null;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TopbarWidget,
    FooterWidget,
    ButtonModule,
    CardModule,
    AvatarModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    RippleModule,
    TooltipModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  providers: [MessageService]
})
export class Perfil implements OnInit {
  user: UserDTO | null = null;
  changePasswordForm: FormGroup;
  showPasswordForm = false;
  submitting = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth,
    private messageService: MessageService
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), passwordPatternValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPass = form.get('newPassword')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    if (newPass !== confirmPass) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      this.changePasswordForm.reset();
      this.errorMsg = '';
    }
  }

  changePassword() {
    this.errorMsg = '';

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const formValues = this.changePasswordForm.value;

    const peticion = {
      password_actual: formValues.currentPassword,
      password_nueva: formValues.newPassword
    };

    this.authService.cambioPassword(peticion).subscribe({
      next: (response) => {
        console.log('[Perfil] Cambio password exitoso:', response);
        this.submitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña actualizada',
          detail: 'Tu contraseña se ha cambiado correctamente.',
          life: 3000
        });
        this.showPasswordForm = false;
        this.changePasswordForm.reset();
      },
      error: (error: any) => {
        this.submitting = false;
        console.error('[Perfil] Error cambio password:', error);

        const backendMsg = error.error?.message || error.error || '';
        if (error.status === 400) {
          this.errorMsg = backendMsg || 'La nueva contraseña no cumple con los requisitos (mín. 8 caracteres, 1 especial !@#$%^&*).';
        } else if (error.status === 401) {
          this.errorMsg = backendMsg || 'La contraseña actual no es correcta.';
        } else if (error.status === 0) {
          this.errorMsg = 'No se pudo conectar con el servidor. Intenta de nuevo.';
        } else {
          this.errorMsg = backendMsg || 'Error al cambiar la contraseña. Intenta de nuevo.';
        }
      }
    });
  }

  goToPublish() {
    this.router.navigate(['/publicar-anuncio']);
  }

  goToPublicaciones() {
    this.router.navigate(['/publicaciones']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getInitials(): string {
    if (!this.user) return '?';
    const nombre = this.user.nombre_per || '';
    const apellido = this.user.apellido_pat_per || '';
    return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase() || '?';
  }

  getFullName(): string {
    if (!this.user) return 'Usuario';
    if (this.user.type === 'juridica') {
      return this.user.nombre_per || 'Usuario';
    }
    // Persona natural
    const partes = [this.user.nombre_per, this.user.apellido_pat_per, this.user.apellido_mat_per];
    return partes.filter(p => p && p !== 'N/A').join(' ') || 'Usuario';
  }

  getEmail(): string {
    return this.user?.email || 'email@ejemplo.com';
  }

  getDocument(): string {
    return this.user?.nro_doc_per || '---';
  }

  getDocumentType(): string {
    return this.user?.tipo_doc_per || '---';
  }

  getRole(): string {
    const role = this.user?.rol || '';
    switch (role) {
      case 'ADMIN': return 'Administrador';
      case 'USER': return 'Usuario';
      case 'AGENT': return 'Agente Inmobiliario';
      default: return role || 'Usuario';
    }
  }

  getRoleIcon(): string {
    const role = this.user?.rol || '';
    switch (role) {
      case 'ADMIN': return 'pi pi-shield';
      case 'AGENT': return 'pi pi-briefcase';
      default: return 'pi pi-user';
    }
  }

  getPersonType(): string {
    if (!this.user) return 'Persona Natural';
    return this.user.type === 'juridica' ? 'Persona Jurídica' : 'Persona Natural';
  }

  getRepresentante(): string {
    return this.user?.nombre_representante_juri || '---';
  }

  getCargo(): string {
    return this.user?.cargo_juri || '---';
  }

  getRegistroMercantil(): string {
    return this.user?.registro_mercantil_juri || '---';
  }

}
