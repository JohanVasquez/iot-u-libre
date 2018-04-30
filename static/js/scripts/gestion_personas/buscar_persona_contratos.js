/**
 * Created by Diego Monsalve on 24/05/17.
 * IMPORTANTE: PARA QUE ESTE SCRIPT FUNCIONE CORRECTAMENTE DEBEN EXISTIR DOS CAMPOS LLAMADOS 'id_persona' y 'id_persona_id'.
 * Declarar variavle 'token'. Ej: var token = '{{ csrf_token }}';
 * Declarar variable 'url_buscar_persona' la cual indica la url del ajax. Ej: var url_buscar_persona = "{% url 'gestion_personas:get_persona' %}";
 * Para llamar el modal con javascript use: $("#modal_buscar_persona").modal('show');
 */

 $('#id_empresa').empty();

function add_form_error(error_message) {
    $("#error_alert").html(error_message);
    $("#error_alert").show();
}

$('#buscar_persona').on('click', function(){
    var numero_identificacion = $('#numero_identificacion').val();
    var tipo_documento = $("#tipo_documento").val();

    if(numero_identificacion == ""){
        $("#div_numero_identificacion").addClass('has-error');
        $("#div_mensaje_numero").html('Por favor digite un número de identificación');
    }
    if(tipo_documento == ""){
        $("#div_tipo_documento").addClass('has-error');
        $("#div_mensaje_tipo").html('Por favor seleccione un tipo de documento');
    }
    if(numero_identificacion == "" || tipo_documento == "") return;

    $.post(url_buscar_persona, {'numero_identificacion': numero_identificacion, 'tipo_documento': tipo_documento, 'csrfmiddlewaretoken': token}, function(response){
        if('error' in response){
            add_form_error(response['error']);
        }else{
            var empresas = [];
            for(pk in response['listado_empresas']){
                empresas.push({'id': pk, 'text': response['listado_empresas'][pk]});
            }
            $('#id_empresa').empty();
            $('#id_empresa').select2({
                data: empresas
            });
            $("#modal_buscar_persona .close-modal").click();
            $("#error_alert").hide();
            $("#id_persona").val(response['value']).trigger('change');
            $("#id_persona_id").val(response['id']);
        }
    });
});

$("#numero_identificacion").bind('keypress', function(event){
    if(event.keyCode == 13){
        event.preventDefault();
        $("#buscar_persona").trigger('click');
    }
});

$("#id_persona").on('click', function(){
    $("#modal_buscar_persona").modal('show');
});

$("#numero_identificacion").on('change', function(){
    if($(this).val()==""){
        $("#div_numero_identificacion").removeClass('has-success');
        $("#div_numero_identificacion").addClass('has-error');
        $("#div_mensaje_numero").html('Por favor digite un número de identificación');
    }else{
        $("#div_numero_identificacion").removeClass('has-error');
        $("#div_numero_identificacion").addClass('has-success');
        $("#div_mensaje_numero").html('');
    }
});

$("#tipo_documento").on('change', function(){
    if($(this).val()==""){
        $("#div_tipo_documento").removeClass('has-success');
        $("#div_tipo_documento").addClass('has-error');
        $("#div_mensaje_tipo").html('Por favor seleccione un tipo de documento');
    }else{
        $("#div_tipo_documento").removeClass('has-error');
        $("#div_tipo_documento").addClass('has-success');
        $("#div_mensaje_tipo").html('');
    }
});