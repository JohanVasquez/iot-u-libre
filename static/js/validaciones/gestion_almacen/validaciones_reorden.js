/**
 * Created by felix micolta on 6/10/17.
 */



var form_id = "puntoreordenForm";
var reglas = {
    recurso: {
        required: true
    },
    bodega: {
        required: true
    },
    cantidad: {
        required: true,
        max: 20000000000
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");
