@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String estado_usu;
    private String rol;
    private PersonaNaturalDTO persona;

    @Data
    public static class PersonaNaturalDTO {
        private String type; // "natural" o "juridica"
        private String nro_doc_per;
        private String tipo_doc_per;
        private String nombre_per;
        private String apellido_pat_per;
        private String apellido_mat_per;
        private String sexo_per;
        private Integer anio_nac_per;
        private String domicilio_per;
        private String cp_per;
        private String provincia_per;
        private String foto_per;

        // Campos de persona natural
        private Boolean primer_vivienda_natu;
        private Double ingresos_aprox_natu;

        // Campos de persona jurídica
        private String nombre_representante_juri;
        private String cargo_juri;
        private String registro_mercantil_juri;
    }
}
