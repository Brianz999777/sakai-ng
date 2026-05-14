import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { TarjetaAlquiler } from '../../interfaces/inmueble';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './alquiler.html',
  styleUrl: './alquiler.scss',
})
export class Alquiler {
  @Input() inmueble!: TarjetaAlquiler;
  @Output() onVerDetalle = new EventEmitter<number>();

  verDetalle() {
    this.onVerDetalle.emit(this.inmueble.id_prop);
  }

  get fullAddress(): string {
    return this.inmueble.direccion_fisica || 'Dirección no disponible';
  }

  get mainPhoto(): string {
    if (this.inmueble.foto_principal) {
      return this.inmueble.foto_principal;
    }
    return '/demo/images/galleria/no_photo.png';
  }
}
