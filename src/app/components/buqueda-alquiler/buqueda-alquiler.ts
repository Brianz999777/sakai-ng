import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { PropiedadAlquiler } from '../../interfaces/inmueble';
import { Alquiler } from '../alquiler/alquiler';
import { FiltroAlquiler } from '../filtro-alquiler/filtro-alquiler';
import { InmuebleService } from '../../service/inmueble.service';

@Component({
  selector: 'app-buqueda-alquiler',
  standalone: true,
  imports: [CommonModule, DataViewModule, Alquiler, FiltroAlquiler],
  templateUrl: './buqueda-alquiler.html',
  styleUrl: './buqueda-alquiler.scss',
})
export class BuquedaAlquiler implements OnInit {
  private inmuebleService = inject(InmuebleService);
  inmuebles: PropiedadAlquiler[] = [];
  inmueblesFiltrados: PropiedadAlquiler[] = [];

  ngOnInit() {
    this.inmuebleService.getAlquileres().subscribe({
      next: (data) => {
        this.inmuebles = data;
        this.inmueblesFiltrados = data;
      },
      error: (err) => console.error("Error al obtener alquileres", err)
    });
  }

  handleFilter(filtros: any) {
    this.inmueblesFiltrados = this.inmuebles.filter(inm => {
      let cumple = true;

      // Filtro Precio Máximo
      if (filtros.precioMax && inm.precio_alquiler > filtros.precioMax) cumple = false;

      // Filtro Tipo (Casa/Piso)
      if (filtros.tipos && filtros.tipos.length > 0) {
        if (!filtros.tipos.includes(inm.tipo_inmueble)) cumple = false;
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
        if (filtros.estado === 'reformado' && !esReformado) cumple = false;
        if (filtros.estado === 'a_reformar' && esReformado) cumple = false;
      }

      return cumple;
    });
  }
}
