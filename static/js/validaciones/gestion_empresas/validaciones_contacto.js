/**
 * Created by deltec on 24/04/17.
 */
var form_id = "contacto-form";
var reglas = {
    nombre: {
        onlyLetters: true
    },
    telefono: {
        phoneNumber: true
    }

};
$.getScript(STATIC_URL+"js/validaciones/base_validations.js");