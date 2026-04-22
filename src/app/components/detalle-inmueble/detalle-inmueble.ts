import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropiedadVenta, PropiedadAlquiler } from '../../interfaces/inmueble';
import { InmuebleMockService } from '../../service/inmueble-mock.service';
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
    private mockService: InmuebleMockService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      const url = this.route.snapshot.url[0].path;
      this.tipo = url.includes('venta') ? 'venta' : 'alquiler';

      if (this.tipo === 'venta' && this.id) {
        this.mockService.getVentaById(this.id).subscribe(res => {
          this.inmuebleVenta = res;
        });
      } else if (this.tipo === 'alquiler' && this.id) {
        this.mockService.getAlquilerById(this.id).subscribe(res => {
          this.inmuebleAlquiler = res;
        });
      }
    });
  }

  get generalInfo() {
    return this.inmuebleVenta || this.inmuebleAlquiler;
  }
}
