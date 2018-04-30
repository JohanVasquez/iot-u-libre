/**
 * Created by Diego Monsalve on 21/04/17.
 */

var form_id = "wizard";

var reglas = {
    '0-nombre_centro_operativo': {
        onlyLetters: true
    },
    '0-fecha_inicio': {
        lessThan: "#id_0-fecha_fin"
    },
    '0-fecha_fin': {
        greaterThan: "#id_0-fecha_inicio"
    }
};

var mensajes = {
    '0-fecha_inicio': {
        lessThan: "La fecha de inicio debe ser menor a la fecha de finalización"
    },
    '0-fecha_fin': {
        greaterThan: "La fecha de finalización debe ser mayor a la fecha de inicio"
    }
};

$("#id_0-fecha_inicio").on('change', function (){
    $("#id_0-fecha_fin").valid();
    $(this).valid();
});

$("#id_0-fecha_fin").on('change', function (){
   $("#id_0-fecha_inicio").valid();
   $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");