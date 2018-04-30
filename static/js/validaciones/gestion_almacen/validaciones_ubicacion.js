/**
 * Created by felix micolta on 3/10/17.
 */

var form_id = "ubicacionForm";
var reglas = {
    recurso: {
        required: true
    },
    pasillo: {
        required: true
    },
    rack: {
        required: true
    },
    nivel: {
        required: true
    },
    lado: {
        required: true
    },
    bodega: {
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");