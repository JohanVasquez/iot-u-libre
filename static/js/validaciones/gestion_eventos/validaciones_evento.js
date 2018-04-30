/**
 * Created by Diego Monsalve
 */

var form_id = "form_evento";
var reglas = {
    capacitador: {
        required: true
    },
    tipo_capacitacion: {
        required: true
    },
    total_personas: {
        min: 0,
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");