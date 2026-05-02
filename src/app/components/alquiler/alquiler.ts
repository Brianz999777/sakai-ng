import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { PropiedadAlquiler } from '../../interfaces/inmueble';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './alquiler.html',
  styleUrl: './alquiler.scss',
})
export class Alquiler {
  @Input() inmueble!: PropiedadAlquiler;

  get fullAddress(): string {
    return `${this.inmueble.tipo_via_prop} ${this.inmueble.direccion_prop}, ${this.inmueble.numero_prop}`;
  }

  get mainPhoto(): string {
    return this.inmueble.fotos && this.inmueble.fotos.length > 0 
      ? this.inmueble.fotos[0].url_foto 
      : 'assets/images/no-photo.jpg';
  }
}
