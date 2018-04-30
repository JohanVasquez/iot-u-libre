/**
 * Created by diego on 6/29/17.
 */

var form_id = "actividad-form";
var reglas = {
    'fecha_inicio': {
        lessThan: "#id_fecha_fin"
    },
    'fecha_fin': {
        greaterThan: "#id_fecha_inicio"
    }
};

var mensajes = {
    'fecha_inicio': {
        lessThan: "La fecha de inicio debe ser menor a la fecha de finalización"
    },
    'fecha_fin': {
        greaterThan: "La fecha de finalización debe ser mayor a la fecha de inicio"
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");