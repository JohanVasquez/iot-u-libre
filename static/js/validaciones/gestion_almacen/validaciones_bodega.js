/**
 * Created by Diego Monsalve
 */

var form_id = "form_bodega";
var reglas = {
    almacenista: {
        required: true
    },
    ciudad: {
        required: true
    },
    tipo_bodega: {
        required: true
    },
    direccion: {
        required: true
    },
    proyecto: {
        required: true
    },
    nombre: {
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");