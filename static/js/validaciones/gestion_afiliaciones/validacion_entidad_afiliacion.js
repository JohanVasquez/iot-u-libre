/**
 * Created by Johan Vasquez
 */

var form_id = "form_entidad";
var reglas = {
    fecha_inicio: {
        lessThan: new Date()
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");