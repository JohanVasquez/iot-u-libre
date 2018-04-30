/**
 * Created by felix micolta on 19/12/17.
 */
var form_id = "informe_intalados_form";
var reglas = {
    bodega: {
        required: true
    },
    fecha_inicio: {
        required: true
    },
    fecha_fin: {
        required: true
    }
};

$.getScript(STATIC_URL+"js/validaciones/base_validations.js");