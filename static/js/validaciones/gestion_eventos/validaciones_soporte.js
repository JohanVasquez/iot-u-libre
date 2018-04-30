/**
 * Created by Diego Monsalve
 */

var form_id = "soporte_form";
var reglas = {
    'archivo': {
        required: true,
        extension: "xls|xlsx|pdf|doc|docx|ppt|pps|txt|jpg|jpeg|png|tiff|tif|ods|odt",
        fileSize: 3000
    }
};

var mensajes = {
    'archivo': {
        extension: "Este tipo de archivo no está permitido. Extensiones permitidas: xls, xlsx, pdf, doc, docx, ppt, pps, png, jpg, txt, ods, odt",
        fileSize: "El tamaño del archivo no debe superar 3 MB"
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");