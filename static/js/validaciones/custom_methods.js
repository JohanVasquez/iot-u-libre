/**
 * Created by Diego Monsalve on 25/04/17.
 * Script donde se implementan funciones personalizadas para ser aplicadas como reglas sobre los campos de un formulario
 */


$.getScript(STATIC_URL+"js/moment.js");

//Funcion auxiliar para los metodos greaterThan y lessThan
//type 0: Indica mayor que
//type 1: Indica menor que
function comparison(value, param, type){
    if(typeof param == "string" && param.indexOf('#') != -1){
        param = $(param).val();
    }

    if(param == null || param == "" || value == ""){
        return true;
    }

    if(typeof param == "string"){

        if(param.indexOf('/') != -1){
            param = param.split("/");
        }else if(param.indexOf('-') != -1){
            param = param.split("-");
        }

        var arr = param[2].split(' ');
        var time = [0, 0];
        if(arr.length > 1){
            time = arr[1].split(':');
            param[2] = arr[0];
        }

        param = new Date(param[2], param[1]-1, param[0], time[0], time[1]);
    }

    if(typeof value == "string"){
        if(value.indexOf('/') != -1) {
            value = value.split('/');
        }else if(value.indexOf('-') != -1){
            value = value.split('-');
        }

        var arr = value[2].split(' ');
        var time = [0, 0];
        if(arr.length > 1){
            time = arr[1].split(':');
            value[2] = arr[0];
        }
        value = new Date(value[2], value[1]-1, value[0], time[0], time[1]);
    }

    if(typeof value == 'object' && typeof param == 'object'){
        if(!/Invalid|NaN/.test(value) && !/Invalid|NaN/.test(param)){
            if(type == 1){
                return value > param;
            }else{
                return value < param;
            }
        }else{
            console.log('Invalid dates');
        }
    }else{
        if(type == 1) return isNaN(value) && isNaN(param) || (Number(value) > Number(param));
        else return isNaN(value) && isNaN(param) || (Number(value) < Number(param));
    }
}


// Metodo para verificar que el valor de un campo tenga cierta cantidad de digitos
jQuery.validator.addMethod("length_digits", function(value, element, param) {
    return this.optional(element) || value.length == param;
}, 'Por favor ingrese {0} dígitos.');


// Metodo para verificar que el valor de un campo sea mayor que otro valor.
// El valor a comparar puede ser una fecha, un numero u otro campo del formulario
jQuery.validator.addMethod("greaterThan", function(value, element, param){
    return comparison(value, param, 1);
},'Debe ser mayor que {0}.');


// Metodo para verificar que el valor de un campo sea menor que otro valor.
// El valor a comparar puede ser una fecha, un numero u otro campo del formulario
jQuery.validator.addMethod("lessThan", function(value, element, param){
    return comparison(value, param, 0);
},'Debe ser menor que {0}.');


// Metodo para verificar que el valor de un campo contenga solamente letras y espacios
jQuery.validator.addMethod("onlyLetters", function(value, element, param) {
    var letters = /^[a-z\u00E0-\u00FC\s]+$/i;
    //var letters = /^[A-Za-z]*$/;
    if(param == false || value.replace(' ', '').match(letters)){
        return true;
    }else{
        return false;
    }
}, 'Este campo sólo puede contener letras');


// Metodo para verificar que el valor de un campo sea un numero de telefono
jQuery.validator.addMethod("phoneNumber", function(value, element, param) {
    value = value.replace(' ', '');
    var filter = /^[0-9(+)-]*$/;
    if(filter.test(value)) {
        return true;
    }
    else {
        return false;
    }
}, 'Por favor digite un teléfono válido');


// Metodo para verificar que el valor de un archivo tenga un tamaño menor a cierta cantidad de kilobytes
$.validator.addMethod('fileSize', function (value, element, param) {
    return this.optional(element) || (element.files[0].size/1024 <= param)
}, 'El tamaño del archivo no debe superar {0} Kb');


// Metodo para verificar que el valor de la fecha de un campo sea mayor o igual que otro valor.
// El valor a comparar puede ser una fecha, un numero u otro campo del formulario
jQuery.validator.addMethod("greaterOrEqual", function(value, element, param){

    var curDate = moment($(param).val(), "DD/MM/YYYY").format('YYYY-MM-DD');
    var inputDate = moment(value, "DD/MM/YYYY").format('YYYY-MM-DD');
    return moment(curDate).isSameOrBefore(inputDate);
},'Debe ser mayor que mayor.');


// Metodo para verificar que el valor de una fecha sea mayor o igual que otro valor.
// El valor a comparar puede ser una fecha, un numero u otro campo del formulario
jQuery.validator.addMethod("greaterOrEqualDate", function(value, element, param){
    console.log(param);
    console.log(value);
    var curDate = moment(param, "DD/MM/YYYY").format('YYYY-MM-DD');
    var inputDate = moment(value, "DD/MM/YYYY").format('YYYY-MM-DD');
    return moment(curDate).isSameOrBefore(inputDate);
},'la fecha debe ser mayor que mayor.');
