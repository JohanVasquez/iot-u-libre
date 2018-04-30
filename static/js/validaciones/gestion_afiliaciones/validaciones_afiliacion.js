/**
 * Created by Diego Monsalve on 28/03/17.
 */

var form_id = "form_afiliacion";

var reglas = {
};
var mensajes = {
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");


$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$(".one").on('change', function () {
    $(this).valid();
});

$(".datepicker").on('change', function () {
    $(this).valid();
});