/**
 * Created by Felix Micolta
 */

var form_id = "form_recurso";
var reglas = {
    codigo: {
        required: true
    },
    marca: {
        required: true
    },
    categoria: {
        required: true
    },
    vida_util: {
        required: true
    },
    precio_venta: {
        required: true
    },
    precio_compra: {
        required: true
    },
    unidad: {
        required: true
    },
    descripcion: {
        required: true
    }
};

$(".datetimepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");