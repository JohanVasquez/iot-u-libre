/**
 * Created by deltec on 5/04/17.
 */

var form_id = "general-form";
var reglas = {
    'fecha_publicacion': {
        lessThan: "#id_fecha_cierre"
    },
    'fecha_cierre': {
        greaterThan: "#id_fecha_publicacion"
    }
};

var mensajes = {
    'fecha_publicacion': {
        lessThan: "La fecha de publicación debe ser menor a la fecha de cierre"
    },
    'fecha_cierre': {
        greaterThan: "La fecha de cierre debe ser mayor a la fecha de publicación"
    }
};

$("#id_fecha_publicacion").on('change', function (){
    $("#id_fecha_cierre").valid();
    $(this).valid();
});

$("#id_fecha_cierre").on('change', function (){
   $("#id_fecha_publicacion").valid();
   $(this).valid();
});

$(".one").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");