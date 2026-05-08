import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TarjetaVenta } from '../../interfaces/inmueble';
import { Venta } from '../venta/venta';
import { FiltroVenta } from '../filtro-venta/filtro-venta';
import { InmuebleService } from '../../service/inmueble.service';

@Component({
  selector: 'app-buqueda-venta',
  standalone: true,
  imports: [CommonModule, DataViewModule, Venta, FiltroVenta],
  templateUrl: './buqueda-venta.html',
  styleUrl: './buqueda-venta.scss',
})
export class BuquedaVenta implements OnInit {
  private inmuebleService = inject(InmuebleService);
  private cdr = inject(ChangeDetectorRef);
  inmuebles: TarjetaVenta[] = [];
  inmueblesFiltrados: TarjetaVenta[] = [];
  filtrosActuales: any = {};

  ngOnInit() {
    this.inmuebleService.getVentas().subscribe({
      next: (data) => {
        this.inmuebles = data;
        this.aplicarFiltrosActuales();
      },
      error: (err) => console.error("Error al obtener ventas", err)
    });
  }

  handleFilter(filtros: any) {
    this.filtrosActuales = filtros || {};
    this.aplicarFiltrosActuales();
  }

  aplicarFiltrosActuales() {
    const filtros = this.filtrosActuales;
    this.inmueblesFiltrados = this.inmuebles.filter(inm => {
      let cumple = true;

      // Filtro Precio Máximo
      if (filtros.precioMax && inm.precio_venta > filtros.precioMax) cumple = false;

      // Filtro Tipo (Casa/Piso)
      if (filtros.tipos && filtros.tipos.length > 0) {
        if (inm.tipo_inmueble && !filtros.tipos.includes(inm.tipo_inmueble)) cumple = false;
      }

      // Filtro Habitaciones (Checkbox)
      if (filtros.habitaciones && filtros.habitaciones.length > 0) {
        const matches = filtros.habitaciones.some((h: number) => {
          if (h === 4) return (inm.nro_habitaciones ?? 0) >= 4;
          return inm.nro_habitaciones === h;
        });
        if (!matches) cumple = false;
      }

      // Filtro Baños (Checkbox)
      if (filtros.banos && filtros.banos.length > 0) {
        const matches = filtros.banos.some((b: number) => {
          if (b === 3) return (inm.nro_banos ?? 0) >= 3;
          return inm.nro_banos === b;
        });
        if (!matches) cumple = false;
      }

      // Filtro Estado
      if (filtros.estado) {
        const esReformado = inm.reformado === true;
        if (inm.reformado !== undefined) {
          if (filtros.estado === 'reformado' && !esReformado) cumple = false;
          if (filtros.estado === 'a_reformar' && esReformado) cumple = false;
        }
      }

      return cumple;
    });
    this.cdr.detectChanges();
  }
}
