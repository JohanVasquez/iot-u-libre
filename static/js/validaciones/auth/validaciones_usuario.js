/**
 * Created by Diego Monsalve on 23/03/17.
 */

var form_id = "user-form";
var reglas = {
    email: {
        required: true,
        email: true
    },
    password2: {
        equalTo: '#id_password'
    },
    foto: {
        extension: "jpg|jpeg|png|tiff|tif",
        fileSize: 3000
    },
    proyectos: {
        required: true
    }
};

var mensajes = {
    password2: {
        equalTo: 'Las contraseñas no coinciden'
    },
    'foto': {
        extension: "Este tipo de archivo no está permitido. Extensiones permitidas: png, jpg, jpeg, tiff, tif",
        fileSize: "El tamaño del archivo no debe superar 3 MB"
    }
};

$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");