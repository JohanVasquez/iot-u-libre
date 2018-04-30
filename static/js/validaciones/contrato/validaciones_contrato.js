/**
 * Created by deltec on 28/03/17.
 */

var form_id = "id_forms_contrato";

if (typeof form !== 'undefined') {
    form_id = form;
}

var reglas = {
    '2-fecha_inicio': {
        lessThan: "#id_2-fecha_vencimiento"
    },
    '2-fecha_vencimiento': {
        greaterThan: "#id_2-fecha_inicio"
    }
};

var mensajes = {
    '2-fecha_inicio': {
        lessThan: "La fecha de inicio debe ser menor a la fecha de vencimiento"
    },
    '2-fecha_vencimiento': {
        greaterThan: "La fecha de vencimiento debe ser mayor a la fecha de inicio"
    }
};

$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$("#id_2-fecha_inicio").on('change', function () {
    $("#id_2-fecha_inicio").valid();
});

$("#id_2-fecha_vencimiento").on('change', function () {
    $("#id_2-fecha_vencimiento").valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");
