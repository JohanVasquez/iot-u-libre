/**
 * Created by Diego Monsalve on 20/02/17.
 */

var form_id = "persona-form";

if (typeof form !== 'undefined') {
    form_id = form;
}

var reglas = {
    nombres: {
        onlyLetters: true
    },
    apellidos: {
        onlyLetters: true
    },
    numero_identificacion: {
        min: 0
    },
    confirmacion_numero_identificacion :{
        min: 0,
        equalTo: "#id_numero_identificacion"
    },
    correo_electronico: {
        email: true
    },
    telefono_fijo: {
        phoneNumber: true
    },
    telefono_movil: {
        phoneNumber: true
    },
    numero_cuenta_bancaria: {
        min: 0,
        digits: true
    },
    fecha_expedicion_identificacion: {
        lessThan: new Date()
    },
    fecha_nacimiento: {
        lessThan: new Date()
    }
};

mensajes = {
    fecha_nacimiento: {
        lessThan: 'La fecha de nacimiento debe ser menor a la fecha de hoy'
    },
    fecha_expedicion_identificacion: {
        lessThan: 'La fecha de expedición del documento debe ser menor a la fecha de hoy'
    }
};

$(".datepicker").on('change', function () {
    $(this).valid();
});

$(".one").on('change', function () {
    $(this).valid();
});

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");

