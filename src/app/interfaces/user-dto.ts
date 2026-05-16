export interface UserDTO {
  nro_doc_per: string;
  email: string;
  rol: string;
  nombre_per: string;
  apellido_pat_per: string;
  apellido_mat_per: string;
  tipo_doc_per: string;
  foto_per: string | null;
  type?: string; // 'natural' | 'juridica'
  // Persona jurídica
  nombre_representante_juri?: string;
  cargo_juri?: string;
  registro_mercantil_juri?: string;
}
