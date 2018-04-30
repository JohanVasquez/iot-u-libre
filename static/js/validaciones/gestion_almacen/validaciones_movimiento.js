/**
 * Created by Daniel Lopez on 10/10/2017.
 */

var form_id = "wizard";
var reglas = {
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");


$(document).ready(function () {
    var bodega_origen = $('#id_0-bodega_origen');
    if(bodega_origen.val() !== '' && $('#id_0-tipo_movimiento').val() !== '0'){
        bodega_origen.prop('readonly', true);
        bodega_origen.attr('readonly', true);
        bodega_origen.css("pointer-events", "none");
    }
});
