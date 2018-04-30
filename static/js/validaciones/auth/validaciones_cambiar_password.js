/**
 * Created by Diego Monsalve on 24/05/17.
 */

var form_id = "password-reset-change";
var reglas = {
    new_password2: {
        equalTo: '#id_new_password1'
    }
};

var mensajes = {
    new_password2: {
        equalTo: 'Las contraseñas no coinciden'
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");