/**
 * Created by felix micolta on 7/11/17.
 */

var form_id = "form_recurso_homologado";
var reglas = {
    recurso: {
        required: true
    },
    cliente: {
        required: true
    },
    codigo_homologacion: {
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");


