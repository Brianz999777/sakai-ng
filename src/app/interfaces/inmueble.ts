export interface Foto {
    id_foto?: number;
    url_foto: string;
    descripcion_foto?: string;
}

export interface Propiedad {
    id_prop?: number;
    nro_ref_prop: string;
    tipo_via_prop: string;
    direccion_prop: string;
    numero_prop: number;
    planta_prop: number;
    puerta_prop: string;
    cp_prop: string;
    provincia_prop: string;
    nro_catastral_prop: string;
    ascensor_prop: boolean;
    metros_prop: number;
    anyo_construccion_prop: number;
    antiguedad_prop: string;
    fecha_publicacion_prop: string;
    tipo_inmueble: 'casa' | 'piso';
    nro_habitaciones: number;
    nro_banos: number;
    reformado: boolean;
    fotos: Foto[];
}

export interface PropiedadAlquiler extends Propiedad {
    fianza_alquiler: number;
    nro_personas_alquiler: number;
    exterior_alquiler: boolean;
    permite_mascotas_alquiler: boolean;
    permite_parejas_alquiler: boolean;
    wifi_alquiler: boolean;
    permite_visitas_alquiler: boolean;
    descripcion_alquiler: string;
    precio_alquiler: number;
}

export interface PropiedadVenta extends Propiedad {
    balcon_venta: boolean;
    clase_energetica_venta: string;
    amueblada_venta: boolean;
    garage_venta: boolean;
    aire_acondicionado_venta: boolean;
    libre_cargas_venta: boolean;
    negociable_venta: boolean;
    reforma_venta: boolean; // Mantener por compatibilidad interna de momento o migrar luego
    descripcion_venta: string;
    precio_venta: number; 
}
