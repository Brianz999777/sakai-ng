import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropiedadVenta, PropiedadAlquiler } from '../../interfaces/inmueble';
import { InmuebleService } from '../../service/inmueble.service';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-detalle-inmueble',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GalleriaModule,
    TagModule,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './detalle-inmueble.html',
  styleUrl: './detalle-inmueble.scss',
})
export class DetalleInmueble implements OnInit {
  id: number | null = null;
  tipo: 'venta' | 'alquiler' = 'venta';
  inmuebleVenta?: PropiedadVenta;
  inmuebleAlquiler?: PropiedadAlquiler;
  
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private inmuebleService: InmuebleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      const url = this.route.snapshot.url[0].path;
      this.tipo = url.includes('venta') ? 'venta' : 'alquiler';

      if (this.tipo === 'venta' && this.id) {
        this.inmuebleService.getVentaById(this.id).subscribe({
          next: (res) => this.inmuebleVenta = res,
          error: (err) => console.error("Error obteniendo detalle venta", err)
        });
      } else if (this.tipo === 'alquiler' && this.id) {
        this.inmuebleService.getAlquilerById(this.id).subscribe({
          next: (res) => this.inmuebleAlquiler = res,
          error: (err) => console.error("Error obteniendo detalle alquiler", err)
        });
      }
    });
  }

  get generalInfo() {
    return this.inmuebleVenta || this.inmuebleAlquiler;
  }
}
