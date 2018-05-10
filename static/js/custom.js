// Encargado de colocar '(*)' en todos los campos obligatorios de un formulario
$('form').each(function(){
    if(!$(this).hasClass('no-alert')){
        $(this).prepend('<div class="alert alert-info fade in m-b-15">Los campos con (*) son obligatorios <span class="close" data-dismiss="alert">×</span></div>');
    }
});

// Inicializan el plugin Select2
$.fn.select2.defaults.set("theme", "bootstrap");
$("select.one").select2({
    placeholder: 'Seleccione una opción',
    allowClear: true,
    width: null,
    language: "es"
});
$("select.many").select2({
    multiple: true,
    placeholder: 'Seleccione una o más opciones',
    width: null,
    language: "es"
});

// Inicializa el plugin para mostrar la cantidad de caracteres permitidos en un campo
$('input[type=email], :text, :password').each(function () {
    if($(this).attr("maxLength") != undefined){
        $(this).maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true
        });
    }
});

// Plugin para mostrar mensajes de notificación
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

// Plugin para desplegar calendario en campos tipo fecha
$('.datepicker').datepicker({
    //format: 'yyyy-mm-dd',
    format: 'dd/mm/yyyy',
    startView: 2,
    autoclose: true,
    language: 'es',
    todayHighlight: true,
});

// Plugin para seleccionar la hora en campos tipo time
$('.timepicker').datetimepicker({
    format: 'LT',
});

// Plugin para desplegar calendario y hora en campos tipo datetime
$('.datetimepicker').datetimepicker({
    locale: 'es',
    viewMode: 'years',
    format : 'DD/MM/YYYY HH:mm',
    tooltips: {
        selectMonth: 'Seleccione un mes',
        prevMonth: 'Anterior mes',
        nextMonth: 'Siguiente mes',
        selectYear: 'Seleccione un año',
        prevYear: 'Anterior año',
        nextYear: 'Siguiente año',
        selectDecade: 'Seleccionar década',
        prevDecade: 'Anterior década',
        nextDecade: 'Siguiente década',
        prevCentury: 'Anterior siglo',
        nextCentury: 'Siguiente siglo',
        pickHour: 'Escoger hora',
        incrementHour: 'Incrementar hora',
        decrementHour: 'Decrementar hora',
        pickMinute: 'Escoger minutos',
        incrementMinute: 'Incrementar minuto',
        decrementMinute: 'Decrementar minuto',
        pickSecond: 'Pick Second',
        incrementSecond: 'Increment Second',
        decrementSecond: 'Decrement Second',
        togglePeriod: 'Cambiar',
        selectTime: 'Seleccione una hora'
    },
});

// Plugin para dar formato de moneda al valor de un campo
$('.money').mask('#.##0', {reverse: true});


//if(!$('table').parents('.table-responsive').length){
//    $('table').wrap('<div class="table-responsive">');
//}