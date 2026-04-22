import { Injectable } from '@angular/core';
import { PropiedadVenta, PropiedadAlquiler } from '../interfaces/inmueble';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InmuebleMockService {

  getVentasMock(): Observable<PropiedadVenta[]> {
    const ventasBase: PropiedadVenta[] = [
      {
        idProp: 1,
        nroRefProp: 'REF-001',
        tipoViaProp: 'Calle',
        direccionProp: 'Mariano Royo Urieta',
        numeroProp: 15,
        plantaProp: 3,
        puertaProp: 'B',
        cpProp: '50006',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: '1234567890ABC',
        ascensorProp: true,
        metrosProp: 85,
        anyoConstruccionProp: 1995,
        antiguedadProp: '29 años',
        fechaPublicacionProp: '2024-04-20',
        tipoInmueble: 'piso',
        nroHabitaciones: 3,
        nroBanos: 2,
        reformado: true,
        balconVenta: true,
        claseEnergeticaVenta: 'A',
        amuebladaVenta: true,
        garageVenta: true,
        aireAcondicionadoVenta: true,
        libreCargasVenta: true,
        negociableVenta: true,
        reformaVenta: true,
        fotos: [
          { urlFoto: 'https://images.unsplash.com/photo-1502672260266-1c1ef3c4c958?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=600&h=400' }
        ],
        descripcionVenta: 'Espectacular piso en el centro, muy luminoso y bien comunicado. Reformas recientes en cocina y baños. Ideal para familias que buscan comodidad.',
        precioVenta: 185000
      },
      {
        idProp: 2,
        nroRefProp: 'REF-002',
        tipoViaProp: 'Avenida',
        direccionProp: 'Goya',
        numeroProp: 42,
        plantaProp: 5,
        puertaProp: 'Izda',
        cpProp: '50005',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: '0987654321XYZ',
        ascensorProp: true,
        metrosProp: 120,
        anyoConstruccionProp: 1980,
        antiguedadProp: '44 años',
        fechaPublicacionProp: '2024-04-18',
        tipoInmueble: 'casa',
        nroHabitaciones: 4,
        nroBanos: 3,
        reformado: false,
        balconVenta: false,
        claseEnergeticaVenta: 'E',
        amuebladaVenta: false,
        garageVenta: false,
        aireAcondicionadoVenta: false,
        libreCargasVenta: true,
        negociableVenta: true,
        reformaVenta: false,
        fotos: [{ urlFoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=400' }],
        descripcionVenta: 'Amplio piso señorial con vistas a la avenida. Techos altos y muchas posibilidades de reforma. Muy cerca del tranvía y servicios.',
        precioVenta: 240000
      },
      {
        idProp: 5,
        nroRefProp: 'REF-005',
        tipoViaProp: 'Calle',
        direccionProp: 'Alfonso I',
        numeroProp: 2,
        plantaProp: 2,
        puertaProp: 'A',
        cpProp: '50003',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: 'AAAA1111BBBB',
        ascensorProp: true,
        metrosProp: 75,
        anyoConstruccionProp: 2022,
        antiguedadProp: '2 años',
        fechaPublicacionProp: '2024-04-22',
        tipoInmueble: 'piso',
        nroHabitaciones: 2,
        nroBanos: 1,
        reformado: true,
        balconVenta: true,
        claseEnergeticaVenta: 'A',
        amuebladaVenta: false,
        garageVenta: true,
        aireAcondicionadoVenta: true,
        libreCargasVenta: true,
        negociableVenta: false,
        reformaVenta: true,
        fotos: [{ urlFoto: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=600&h=400' }],
        descripcionVenta: 'Obra nueva en pleno casco histórico. Excelentes calidades, domótica integrada y aerotermia. Una oportunidad única de inversión.',
        precioVenta: 215000
      }
    ];

    // Generar 12 inmuebles más para probar paginación
    const extras = [...ventasBase];
    for (let i = 10; i < 22; i++) {
        extras.push({
            ...ventasBase[i % 3],
            idProp: i,
            nroRefProp: `REF-0${i}`,
            tipoInmueble: ventasBase[i % 3].tipoInmueble,
            direccionProp: `Calle Ficticia ${i}`,
            precioVenta: 150000 + (i * 1000),
            metrosProp: 60 + (i % 50)
        });
    }
    return of(extras);
  }

  getAlquileresMock(): Observable<PropiedadAlquiler[]> {
    const alquileresBase: PropiedadAlquiler[] = [
      {
        idProp: 3,
        nroRefProp: 'ALQ-001',
        tipoViaProp: 'Paseo',
        direccionProp: 'Sagasta',
        numeroProp: 10,
        plantaProp: 2,
        puertaProp: 'Centro',
        cpProp: '50006',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: '555666777888S',
        ascensorProp: true,
        metrosProp: 60,
        anyoConstruccionProp: 2010,
        antiguedadProp: '14 años',
        fechaPublicacionProp: '2024-04-21',
        tipoInmueble: 'piso',
        nroHabitaciones: 1,
        nroBanos: 1,
        reformado: true,
        fotos: [
          { urlFoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600&h=400' },
        ],
        fianzaAlquiler: 1200,
        nroPersonasAlquiler: 1,
        exteriorAlquiler: true,
        permiteMascotasAlquiler: false,
        permiteParejasAlquiler: true,
        wifiAlquiler: true,
        permitevisitasAlquiler: true,
        descripcionAlquiler: 'Estudio moderno recién reformado en pleno Paseo Sagasta. Ideal para profesionales o estudiantes de postgrado. Luminoso y céntrico.',
        precioAlquiler: 650
      },
      {
        idProp: 4,
        nroRefProp: 'ALQ-002',
        tipoViaProp: 'Calle',
        direccionProp: 'San Miguel',
        numeroProp: 5,
        plantaProp: 1,
        puertaProp: 'A',
        cpProp: '50001',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: '444333222111X',
        ascensorProp: false,
        metrosProp: 45,
        anyoConstruccionProp: 1960,
        antiguedadProp: '64 años',
        fechaPublicacionProp: '2024-04-22',
        tipoInmueble: 'piso',
        nroHabitaciones: 2,
        nroBanos: 1,
        reformado: false,
        fotos: [
          { urlFoto: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600&h=400' }
        ],
        fianzaAlquiler: 900,
        nroPersonasAlquiler: 2,
        exteriorAlquiler: false,
        permiteMascotasAlquiler: true,
        permiteParejasAlquiler: true,
        wifiAlquiler: false,
        permitevisitasAlquiler: true,
        descripcionAlquiler: 'Coqueto apartamento en zona muy tranquila. Muy acogedor y funcional. Se aceptan mascotas educadas. Ideal para parejas.',
        precioAlquiler: 450
      },
      {
        idProp: 6,
        nroRefProp: 'ALQ-006',
        tipoViaProp: 'Avenida',
        direccionProp: 'Tenor Fleta',
        numeroProp: 12,
        plantaProp: 8,
        puertaProp: 'C',
        cpProp: '50008',
        provinciaProp: 'Zaragoza',
        nroCatastralProp: 'CCCC7777DDDD',
        ascensorProp: true,
        metrosProp: 95,
        anyoConstruccionProp: 1990,
        antiguedadProp: '34 años',
        fechaPublicacionProp: '2024-04-22',
        tipoInmueble: 'casa',
        nroHabitaciones: 3,
        nroBanos: 2,
        reformado: false,
        fotos: [
          { urlFoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&q=80&w=600&h=400' },
          { urlFoto: 'https://images.unsplash.com/photo-1502672260266-1c1ef3c4c958?auto=format&fit=crop&q=80&w=600&h=400' }
        ],
        fianzaAlquiler: 1600,
        nroPersonasAlquiler: 3,
        exteriorAlquiler: true,
        permiteMascotasAlquiler: false,
        permiteParejasAlquiler: true,
        wifiAlquiler: true,
        permitevisitasAlquiler: true,
        descripcionAlquiler: 'Piso familiar con espectaculares vistas. Muy amplio, con calefacción central incluida en el precio. Cerca de colegios y parques.',
        precioAlquiler: 850
      }
    ];

    // Generar 12 alquileres más
    const extras = [...alquileresBase];
    for (let i = 30; i < 42; i++) {
        extras.push({
            ...alquileresBase[i % 3],
            idProp: i,
            nroRefProp: `ALQ-0${i}`,
            direccionProp: `Calle Alquiler ${i}`,
            precioAlquiler: 400 + (i * 10),
            metrosProp: 40 + (i % 30)
        });
    }
    return of(extras);
  }

  getVentaById(id: number): Observable<PropiedadVenta | undefined> {
    return this.getVentasMock().pipe(
      map(ventas => ventas.find(v => v.idProp === id))
    );
  }

  getAlquilerById(id: number): Observable<PropiedadAlquiler | undefined> {
    return this.getAlquileresMock().pipe(
      map(alquileres => alquileres.find(a => a.idProp === id))
    );
  }
}
