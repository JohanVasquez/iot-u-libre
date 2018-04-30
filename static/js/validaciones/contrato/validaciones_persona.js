var form_id = "persona-form";

if (typeof form !== 'undefined') {
    form_id = form;
}

var reglas = {
    '1-nombres': {
        onlyLetters: true
    },
    '1-apellidos': {
        onlyLetters: true
    },
    '1-numero_identificacion': {
        min: 0
    },
    '1-correo_electronico': {
        required: true,
        email: true
    },
    '1-telefono_fijo': {
        phoneNumber: true
    },
    '1-telefono_movil': {
        phoneNumber: true
    },
    '1-numero_cuenta_bancaria': {
        min: 0,
        digits: true,
    },
    '1-fecha_expedicion_identificacion': {
        lessThan: new Date()
    },
    '1-fecha_nacimiento': {
        lessThan: new Date()
    }
};

mensajes = {
    '1-fecha_nacimiento': {
        lessThan: 'La fecha de nacimiento debe ser menor a la fecha de hoy'
    },
    '1-fecha_expedicion_identificacion': {
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