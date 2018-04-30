/**
 * Created by Johan Vasquez on 29/04/17.
 */

var form_id = "buscar-persona-form";
var reglas = {

};

$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$(".one").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");