// Plugin para mejorar visualización de los campos checkbox by Duvernei Ortiz
// Referencia a clase en static/css/custom.css
$('input[type=checkbox]').addClass('checkbox_seot');

$('input[type=checkbox]').on('change', function () {
    if( $(this).prop('checked') ) {
        $(this).closest('label').css('background-position', '0 -24px')
    } else {
        $(this).closest('label').css('background-position', '0 0')
    }
});
$('input[type=checkbox]').trigger('change');