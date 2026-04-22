import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { PropiedadAlquiler } from '../../interfaces/inmueble';
import { Alquiler } from '../alquiler/alquiler';
import { FiltroAlquiler } from '../filtro-alquiler/filtro-alquiler';
import { InmuebleMockService } from '../../service/inmueble-mock.service';

@Component({
  selector: 'app-buqueda-alquiler',
  standalone: true,
  imports: [CommonModule, DataViewModule, Alquiler, FiltroAlquiler],
  templateUrl: './buqueda-alquiler.html',
  styleUrl: './buqueda-alquiler.scss',
})
export class BuquedaAlquiler implements OnInit {
  private inmuebleService = inject(InmuebleMockService);
  inmuebles: PropiedadAlquiler[] = [];
  inmueblesFiltrados: PropiedadAlquiler[] = [];

  ngOnInit() {
    this.inmuebleService.getAlquileresMock().subscribe(data => {
      this.inmuebles = data;
      this.inmueblesFiltrados = data;
    });
  }

  handleFilter(filtros: any) {
    this.inmueblesFiltrados = this.inmuebles.filter(inm => {
      let cumple = true;

      // Filtro Precio Máximo
      if (filtros.precioMax && inm.precioAlquiler > filtros.precioMax) cumple = false;

      // Filtro Tipo (Casa/Piso)
      if (filtros.tipos && filtros.tipos.length > 0) {
        if (!filtros.tipos.includes(inm.tipoInmueble)) cumple = false;
      }

      // Filtro Habitaciones (Checkbox)
      if (filtros.habitaciones && filtros.habitaciones.length > 0) {
        const matches = filtros.habitaciones.some((h: number) => {
          if (h === 4) return (inm.nroHabitaciones ?? 0) >= 4;
          return inm.nroHabitaciones === h;
        });
        if (!matches) cumple = false;
      }

      // Filtro Baños (Checkbox)
      if (filtros.banos && filtros.banos.length > 0) {
        const matches = filtros.banos.some((b: number) => {
          if (b === 3) return (inm.nroBanos ?? 0) >= 3;
          return inm.nroBanos === b;
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
