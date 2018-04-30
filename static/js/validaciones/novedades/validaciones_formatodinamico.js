/**
 * Created by xx.
 */

var form_id = "form_novedad";
var reglas = {

};

$(".datepicker").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");


/*
$("#id_FECHA\\ DESDE").on('change', function () {
    $("span#id_FECHA\\ DESDE-error").each(function(){ $(this).remove(); });
    $(this).valid();
    event.stopPropagation()
});
$("#id_FECHA\\ DESDE").blur(function(){
    $("span#id_FECHA\\ DESDE-error:gt(0)").each(function(){ $(this).remove(); });
});

$("#id_FECHA\\ HASTA").on('change', function () {
    $("span#id_FECHA\\ HASTA-error").each(function(){ $(this).remove(); });
    $(this).valid();
    event.stopPropagation()
});
$("#id_FECHA\\ HASTA").blur(function(){
    $("span#id_FECHA\\ HASTA-error:gt(0)").each(function(){ $(this).remove(); });
});

$("#id_No\\.\\ Horas").on('change', function () {
    $("span#id_No\\.\\ Horas-error").each(function(){ $(this).remove(); });
    $(this).valid();
    console.log("cambio..");
    event.stopPropagation()
});
$("#id_No\\.\\ Horas").blur(function(){
    $("span#id_No\\.\\ Horas-error:gt(0)").each(function(){ $(this).remove(); });
});
$("#id_No\\.\\ Horas").keyup(function(){
    $("span#id_No\\.\\ Horas-error").each(function(){ $(this).remove(); });
    $(this).valid();
    event.stopPropagation()
});
*/
