
$('head').append('<link rel="stylesheet" type="text/css" href="'+STATIC_URL+'assets/plugins/datatables/media/css/dataTables.bootstrap.min.css">');
$('head').append('<link rel="stylesheet" type="text/css" href="'+STATIC_URL+'assets/plugins/datatables/extensions/Buttons/css/buttons.bootstrap.min.css">');
$('head').append('<link rel="stylesheet" type="text/css" href="'+STATIC_URL+'assets/plugins/datatables/extensions/Responsive/css/responsive.bootstrap.min.css">');
$('head').append('<link rel="stylesheet" type="text/css" href="'+STATIC_URL+'assets/plugins/datatables/extensions/ColReorder/css/colReorder.bootstrap.min.css">');

$.getScript(STATIC_URL+"assets/plugins/datatables/media/js/jquery.dataTables.js", function(){
    $.getScript(STATIC_URL+"assets/plugins/datatables/media/js/dataTables.bootstrap.min.js", function(){
        $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/dataTables.buttons.min.js", function(){
            $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/buttons.bootstrap.min.js", function(){
                $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/buttons.flash.min.js", function(){
                    $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/jszip.min.js", function(){
                        $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/pdfmake.min.js", function(){
                            $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/vfs_fonts.min.js", function(){
                                $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/buttons.html5.min.js", function(){
                                    $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/buttons.print.min.js", function(){
                                        $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js", function(){
                                            $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js", function(){
                                                $.getScript(STATIC_URL+"assets/plugins/datatables/extensions/Buttons/js/buttons.colVis.js", function(){

                                                    var order = [[0, 'asc']];
                                                    if(typeof order_by !== 'undefined'){
                                                        order = order_by;
                                                    }

                                                    var buttons = [
                                                        { extend: 'copy', className: 'btn-sm', text: 'Copiar'},
                                                        { extend: 'csv', className: 'btn-sm', text: 'CSV', exportOptions: {columns: ':visible'}},
                                                        { extend: 'excel', className: 'btn-sm', text: 'Excel', exportOptions: {columns: ':visible'}},
                                                        { extend: 'pdf', className: 'btn-sm', text: 'PDF', exportOptions: {columns: ':visible'}, orientation: 'landscape', pageSize: 'LEGAL'},
                                                        { extend: 'print', className: 'btn-sm', text: 'Imprimir', exportOptions: {columns: ':visible'}},
                                                        { extend: 'colvis', className: 'btn-sm', text: 'Columnas'}
                                                    ];

                                                    var table = $(".datatable").DataTable({
                                                        "language": {
                                                            "sProcessing":      "Procesando...",
                                                            "sLengthMenu":      "Mostrar _MENU_ registros",
                                                            "sZeroRecords":     "No se encontraron resultados",
                                                            "sEmptyTable":      "Ningún dato disponible en esta tabla",
                                                            "sInfo":            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                                            "sInfoEmpty":       "Mostrando registros del 0 al 0 de un total de 0 registros",
                                                            "sInfoFiltered":    "(filtrado de un total de _MAX_ registros)",
                                                            "sInfoPostFix":     "",
                                                            "sSearch":          "Buscar:",
                                                            "sUrl":             "",
                                                            "sInfoThousands":   ",",
                                                            "sLoadingRecords":  "Cargando...",
                                                            select: {
                                                                rows: {
                                                                    _: "%d filas seleccionadas",
                                                                    0: "",
                                                                    1: "una fila seleccionada"
                                                                }
                                                            },
                                                            buttons: {
                                                                copyTitle: 'Copiado al portapapeles',
                                                                copySuccess: {
                                                                    _: '%d líneas copiadas',
                                                                    1: '1 línea copiada'
                                                                }
                                                            },
                                                            "oPaginate": {
                                                                "sFirst":       "Primero",
                                                                "sLast":        "Último",
                                                                "sNext":        "Siguiente",
                                                                "sPrevious":    "Anterior"
                                                            },
                                                            "oAria": {
                                                                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                                            }
                                                        },
                                                         "lengthMenu": [ [10, 25, 50, 1000], [10, 25, 50, 1000] ],
                                                        order: order,
                                                        dom: '<"pull-left m-r-10"f>B<"pull-right"l>rtip',
                                                        buttons: buttons,
                                                        responsive: true,
                                                        // PENDIENTE DE SOLUCIONAR
                                                        scrollX: false
                                                    });

                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


$(document).ready(function () {
    $('.datatable').on('search.dt', function() {
        var input = $(".dataTables_filter :input[type=search]");
        input.attr("title", "Recuerde que la búsqueda es sensible a la acentuación");
        input.tooltip({
            placement: "right",
            trigger: "focus"
        });
    });
});

        /*

        $("#div_tools").css('text-align', 'center');
        $("#div_tools").html(custom_buttons);

        function set_nowrap(){
            $('tr').each(function(){
                var last_td = $(this).find('td:last');
                if(last_td.find('a').length){
                    last_td.css('white-space', 'nowrap');
                }
            });
        }

        set_nowrap();
        $('.datatable').on('draw.dt', function () {
            set_nowrap();
        });

        $('#tools_datatable > li > a.tool-action').on('click', function() {
            var action = $(this).attr('data-action');
            table.buttons(action).trigger();
        });

    });
});
            */