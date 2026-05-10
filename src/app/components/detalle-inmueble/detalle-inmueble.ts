import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PropiedadVenta, PropiedadAlquiler } from '../../interfaces/inmueble';
import { InmuebleService } from '../../service/inmueble.service';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-detalle-inmueble',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GalleriaModule,
    TagModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './detalle-inmueble.html',
  styleUrl: './detalle-inmueble.scss',
})
export class DetalleInmueble implements OnInit, OnChanges {
  @Input() idInput: number | null = null;
  @Input() tipoInput: 'venta' | 'alquiler' | null = null;

  id: number | null = null;
  tipo: 'venta' | 'alquiler' = 'venta';
  inmuebleVenta?: PropiedadVenta;
  inmuebleAlquiler?: PropiedadAlquiler;
  mapUrl: SafeResourceUrl | null = null;
  
  responsiveOptions: any[] = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private inmuebleService: InmuebleService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  volver() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { detalle: null, tipo: null },
      queryParamsHandling: 'merge'
    });
  }
  ngOnInit() {
    // Si no vienen por Input, intentamos sacarlos de la ruta (mantener compatibilidad)
    if (!this.idInput) {
      this.route.params.subscribe(params => {
        const idFromRoute = +params['id'];
        const path = this.route.snapshot.url.map(s => s.path).join('/');
        const tipoFromRoute = path.includes('venta') ? 'venta' : 'alquiler';
        this.cargarDatos(idFromRoute, tipoFromRoute as any);
      });
    } else {
      this.cargarDatos(this.idInput, this.tipoInput as any);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['idInput'] || changes['tipoInput']) && this.idInput) {
      this.cargarDatos(this.idInput, this.tipoInput as any);
    }
  }

  private cargarDatos(id: number, tipo: 'venta' | 'alquiler') {
    this.id = id;
    this.tipo = tipo;
    this.inmuebleVenta = undefined;
    this.inmuebleAlquiler = undefined;

    if (this.tipo === 'venta' && this.id) {
      this.inmuebleService.getVentaById(this.id).subscribe({
        next: (res) => {
          this.inmuebleVenta = res;
          this.generarMapaUrl();
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error obteniendo detalle venta", err)
      });
    } else if (this.tipo === 'alquiler' && this.id) {
      this.inmuebleService.getAlquilerById(this.id).subscribe({
        next: (res) => {
          this.inmuebleAlquiler = res;
          this.generarMapaUrl();
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Error obteniendo detalle alquiler", err)
      });
    }
  }

  private generarMapaUrl() {
    const info = this.generalInfo;
    if (info) {
      const query = encodeURIComponent(`${info.direccion_prop}, ${info.cp_prop}, ${info.provincia_prop}, España`);
      const url = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  get generalInfo() {
    return this.inmuebleVenta || this.inmuebleAlquiler;
  }

  get fotos() {
    return [{ url_foto: '/demo/images/galleria/no_photo.png' }];
  }
}
