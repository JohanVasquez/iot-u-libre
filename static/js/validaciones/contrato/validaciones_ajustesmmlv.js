/**
 * Created by deltec on 28/03/17.
 */
var form_id = "smmlv-form";
var reglas = {
};

$("#id_persona").on('change', function () {
    $("#id_persona").valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");
