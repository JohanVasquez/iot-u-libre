/**
 * Created by Diego Monsalve on 12/06/17.
 */

var form_id = "form_archivo";

var reglas = {
    'vigencia': {
        greaterThan: "today"
    },
    'ruta': {
        required: true,
        extension: "xlsx|docx|pdf|jpg|jpeg|png|tiff|tif",
        fileSize: 30000
    }
};

var mensajes = {
    'vigencia': {
        greaterThan: "La fecha de vigencia debe ser mayor a la fecha actual"
    },
    'ruta': {
        extension: "Este tipo de archivo no está permitido. Extensiones permitidas: xlsx, docx, pdf, png, jpg, jpeg, tif, tiff",
        fileSize: "El tamaño del archivo no debe superar 30 MB"
    }
};

$("#id_vigencia").on('change', function (){
    $("#id_vigencia").valid();
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");