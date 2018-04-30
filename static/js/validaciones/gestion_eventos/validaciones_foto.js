/**
 * Created by Diego Monsalve
 */

var form_id = "foto_form";
var reglas = {
    'foto': {
        required: true,
        extension: "jpg|jpeg|png|tiff|tif",
        fileSize: 3000
    }
};

var mensajes = {
    'foto': {
        extension: "Este tipo de archivo no está permitido. Extensiones permitidas: png, jpg, jpeg, tiff, tif",
        fileSize: "El tamaño del archivo no debe superar 3 MB"
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");