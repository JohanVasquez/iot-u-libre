var form_id = "retiro-contrato-form";
var reglas = {
    fecha_retiro: {
        required: true,
        lessThan: new Date()
    },
    motivo_retiro: {
        required: true
    }
};

var mensajes = {
    fecha_retiro: {
        lessThan: 'La fecha de retiro debe ser menor a la fecha actual'
    }
}

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");