/**
 * Created by Diego Monsalve on 25/05/17.
 */

var form_id = "tipoformato-form";
var reglas = {

};

$("#id_categoria_novedad").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");