/**
 * Created by Diego Monsalve on 17/04/17.
 */

var form_id = "novedad-form";
var reglas = {

};

$(".one").on('change', function () {
    $(this).valid();
});

$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");