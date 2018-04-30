/**
 * Created by Felix Micolta on 28/09/17.
 */

var form_id = "wizard";
var reglas = {
    '0-fecha_necesidad': {
        required: true
    },
    '0-fecha_vencimiento': {
        required: true
    },
    '0-proyecto': {
        required: true
    },
    '0-proceso': {
        required: true
    },
    '0-bodega': {
        required: true
    },
    '0-descripcion': {
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");