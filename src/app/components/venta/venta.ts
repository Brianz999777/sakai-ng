import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { TarjetaVenta } from '../../interfaces/inmueble';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './venta.html',
  styleUrl: './venta.scss',
})
export class Venta {
  @Input() inmueble!: TarjetaVenta;

  get fullAddress(): string {
    return this.inmueble.direccion_fisica || 'Dirección no disponible';
  }

  get mainPhoto(): string {
    return '/demo/images/galleria/no_photo.png';
  }
}
