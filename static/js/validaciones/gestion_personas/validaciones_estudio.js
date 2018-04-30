var form_id = "estudioForm";

var reglas = {
    nombre_estudio: {
        onlyLetters: true
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");