export interface Foto {
    idFoto?: number;
    urlFoto: string;
    descripcionFoto?: string;
}

export interface Propiedad {
    idProp?: number;
    nroRefProp: string;
    tipoViaProp: string;
    direccionProp: string;
    numeroProp: number;
    plantaProp: number;
    puertaProp: string;
    cpProp: string;
    provinciaProp: string;
    nroCatastralProp: string;
    ascensorProp: boolean;
    metrosProp: number;
    anyoConstruccionProp: number;
    antiguedadProp: string;
    fechaPublicacionProp: string;
    tipoInmueble: 'casa' | 'piso';
    nroHabitaciones: number;
    nroBanos: number;
    reformado: boolean;
    fotos: Foto[];
}

export interface PropiedadAlquiler extends Propiedad {
    fianzaAlquiler: number;
    nroPersonasAlquiler: number;
    exteriorAlquiler: boolean;
    permiteMascotasAlquiler: boolean;
    permiteParejasAlquiler: boolean;
    wifiAlquiler: boolean;
    permitevisitasAlquiler: boolean;
    descripcionAlquiler: string;
    precioAlquiler: number;
}

export interface PropiedadVenta extends Propiedad {
    balconVenta: boolean;
    claseEnergeticaVenta: string;
    amuebladaVenta: boolean;
    garageVenta: boolean;
    aireAcondicionadoVenta: boolean;
    libreCargasVenta: boolean;
    negociableVenta: boolean;
    reformaVenta: boolean; // Mantener por compatibilidad interna de momento o migrar luego
    descripcionVenta: string;
    precioVenta: number; 
}
