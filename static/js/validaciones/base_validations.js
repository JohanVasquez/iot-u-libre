

$.getScript(STATIC_URL+"assets/plugins/jquery-validation/js/jquery.validate.min.js", function(){
    $.getScript(STATIC_URL+"assets/plugins/jquery-validation/js/additional-methods.min.js", function(){
        $.getScript(STATIC_URL+"assets/plugins/jquery-validation/js/localization/messages_es.js", function(){
            $.getScript(STATIC_URL+"js/validaciones/custom_methods.js", function(){
                $(document).ready(function() {

                    var form1 = $("#"+form_id);
                    var messages = {};
                    var rules = {};

                    if (typeof mensajes !== 'undefined') {
                        messages = mensajes;
                    }

                    if (typeof reglas !== 'undefined') {
                        rules = reglas;
                    }

                    form1.validate({
                        errorElement: 'span', //default input error message container
                        errorClass: 'help-block', // default input error message class
                        focusInvalid: true, // do not focus the last invalid input
                        ignore: ".ignore",  // validate all fields including form hidden input
                        messages: messages,
                        rules: rules,

                        invalidHandler: function (event, validator) { //display error alert on form submit

                        },

                        highlight: function (element) { // hightlight error inputs
                            if($(element).parent().find('.ms-container').length){
                                $('.ms-container .ms-list').css("border", "1px solid #ff5b57");
                            }
                            if(element.id != ''){
                                $(element).parents('.form-group').last().removeClass('has-success has-feedback').addClass('has-error has-feedback'); // set error class to the control group
                                $(element).parents('.form-group').last().find('span.glyphicon').remove();
                                $(element).parents('.form-group').last().append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                            }
                        },

                        unhighlight: function (element) { // revert the change done by hightlight
                            if($(element).parent().find('.ms-container').length){
                                $('.ms-container .ms-list').css("border-color", "#00acac");
                            }
                            if(element.id != ''){
                                $(element).parents('.form-group').last().removeClass('has-error has-feedback').addClass('has-success has-feedback'); // set error class to the control group
                                $(element).parents('.form-group').last().find('span.glyphicon').remove();
                                $(element).parents('.form-group').last().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
                            }
                        },

                        /*
                        success: function (element) {
                            element.closest('.form-group').removeClass('has-error has-feedback').addClass('has-success has-feedback'); // set success class to the control group
                            element.closest('.form-group').find('span.glyphicon').remove();
                            element.closest('.form-group').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
                        },
                        */

                        errorPlacement: function (error, element) {
                            if (element.parent('.input-group').length) {
                                error.insertAfter(element.parent());
                            } else if (element.hasClass('one') || element.hasClass('many')) {
                                error.insertAfter(element.next('span'));
                            } else if(element.parent().find('.ms-container').length){
                                error.insertAfter(element.parent().find('.ms-container'));
                            } else{
                                error.insertAfter(element);
                            }
                        },

                        submitHandler: function (form) {
                            if ($(form).valid()){
                                form.submit();
                            }
                            return false;
                        }
                    });
                });
            });
        });
    });
});