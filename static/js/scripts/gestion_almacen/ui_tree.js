/**
 * Modified by Felix Micolta on 20/09/17.
 */

var current = null;

// Función encargada de mostrar el modal para crear o renombrar una categoria
function open_modal(action) {
    var buttons = '';
    var modal_title = '';
    var value_nombre = '';
    buttons += '<a class="btn btn-default" data-dismiss="modal">Cerrar</a>';
    if(action == 'create'){
        buttons += '<a class="btn btn-primary" onclick="registrar_nuevo()">Registrar</a>';
        modal_title = 'Registrar nueva';
        $("#nombre").val('');
    }else if(action == 'rename'){
        value_nombre = $("#tree").jstree(true).get_node(current).text;
        modal_title = 'Cambiar nombre';
        buttons += '<a class="btn btn-primary" onclick="cambiar_nombre()">Cambiar nombre</a>';
    }
    $("#modal_nuevo .modal-header h4").html(modal_title);
    $("#modal_nuevo .modal-footer").html(buttons);
    $("#nombre").val(value_nombre);
    $("#nombre").parent().removeClass('has-error has-success').find('span').html('');
    $("#modal_nuevo").modal('show');
}

// Función que muestra el modal de confirmación para activar o desactivar categoria
function open_confirm_modal(action) {
    var modal_title = '';
    var message = '';
    if(action == 'activate'){
        modal_title = 'Activar Categoria';
        message = '¿Está seguro que desea activar esta categoria?';
    }else{
        modal_title = 'Desactivar categoria';
        message = '¿Está seguro que desea desactivar esta categoria?';
    }
    $("#confirm_modal .modal-header h4").html(modal_title);
    $("#confirm_modal .modal-body").html('<p>' + message + '</p>');
    $("#confirm_modal").modal('show');
}

// Función encargada de validar el modal para crear/renombrar categoria
function modal_valid() {
    var state = true;
    var nombre = $("#nombre").val();
    if(nombre == '') {
        $("#nombre").parent().addClass('has-error').find('span').html('Este campo es obligatorio');
        state = false;
    }else{
        $("#nombre").parent().addClass('has-success').find('span').html('');
    }
    return state;
}

// Función encargada de registrar una nueva categoria con ajax
function registrar_nuevo() {
    if(modal_valid()){
        var nombre = $("#nombre").val();
        var tree = $('#tree').jstree(true);
        $.post(url,
            {'text': nombre, 'csrfmiddlewaretoken': token, 'event': 'create', 'parent_id': current},
            function(response){
                if(response['status']){
                    var id = response['id'];
                    var parent = tree.get_node(current);
                    if(parent.id != -1){
                        tree.set_type(parent, 'opened');
                    }
                    var data = {'text': nombre.toUpperCase(), 'id': id, 'type': 'leaf'};
                    create_node(parent, data);
                    $("#modal_nuevo").modal('hide');
                    toastr["success"]('Categoria registrada correctamente');
                }
            }
        );
    }
}

function cambiar_nombre() {
    if(modal_valid()){
        var nombre = $("#nombre").val();
        var tree = $('#tree').jstree(true);
        $.post(url,
            {'text': nombre, 'csrfmiddlewaretoken': token, 'event': 'rename', 'id': current},
            function(response){
                if(response['status']){
                    var node = tree.get_node(current);
                    $("#tree").jstree('rename_node', node , nombre.toUpperCase());
                    $("#modal_nuevo").modal('hide');
                    toastr["success"]('Categoria renombrada correctamente');
                }
            }
        );
    }
}

function cambiar_estado() {
    var tree = $("#tree").jstree(true);
    var node = tree.get_node(current);
    var event = '';
    var message = '';
    if(node.type == 'disabled'){
        event = 'activate';
        message = 'Categoria activada correctamente';
    }else{
        event = 'deactivate';
        message = 'Categoria desactivada correctamente';
    }
    $.post(url,
        {'csrfmiddlewaretoken': token, 'event': event, 'id': current},
        function(response){
            if(response['status']){
                if(node.type == 'disabled'){
                    if(node.children.length > 0){
                        if(tree.is_open(node)){
                            tree.set_type(node, 'opened');
                        }else{
                            tree.set_type(node, 'closed');
                        }
                    }else{
                        tree.set_type(node, 'leaf');
                    }
                }else{
                    tree.set_type(node, 'disabled');
                }
                $("#confirm_modal").modal('hide');
                toastr["success"](message);
            }
        }
    );
}

function create_node(parent, node_data) {
    var tree = $("#tree").jstree(true);
    var new_node = tree.create_node(parent, node_data);
    tree.set_type(parent, 'open');
    tree.open_node(parent);
}

$("#tree").jstree({
    "core" : {
        "themes" : {
            "responsive": false
        },
        'check_callback': function(operation, node, node_parent, node_position, more) {
            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
            // in case of 'rename_node' node_position is filled with the new node name
            return true;  //allow all other operations
        },
        "strings" : {
            'New node': 'Nuevo'
        },
        'data': data
    },
    /*
        dnd: Drag and drop
        state: Permite aplicar el estilo a los tipos de nodo
        types: Diferencia entre nodo carpeta abierta o cerrada
        unique: Nombres dentro de un nodo deben ser unicos
        sort: Ordena de forma ascendente los nombres de carpetas
     */
    "plugins" : ["contextmenu", "types", "unique", "sort", "search"],
    'types' : {
        'opened' : {
            'icon': 'fa fa-chevron-circle-down'
        },
        'closed' : {
            'icon': 'fa fa-chevron-circle-right'
        },
        'root': {
            'icon': 'fa fa-gear'
        },
        'leaf': {
            'icon': 'fa fa-check text-success'
        },
        'disabled': {
            'icon': 'fa fa-close text-danger',
        }
    },
    "dnd": {
        check_while_dragging: true
    },
    contextmenu: {items: context_menu}
});

// Constructor de las opciones que aparecen al dar click derecho sobre un nodo
function context_menu(node){
    var tree = $('#tree').jstree(true);
    var items = {};

    if(node.type == 'disabled'){
        items['Activate'] = {
            "separator_before": true,
            "separator_after": false,
            "label": "Activar",
            "action": function(obj){
                open_confirm_modal('activate');
            }
        };
    }else{
        items['create'] = {
            "separator_before": false,
            "separator_after": false,
            "label": "Nueva",
            "action": function (obj) {
                open_modal('create');
            }
        };

        if(node.id != -1) {
            items['Rename'] = {
                "separator_before": false,
                "separator_after": false,
                "label": "Cambiar nombre",
                "action": function (obj) {
                    open_modal('rename');
                }
            };
            items['Deactivate'] = {
                "separator_before": true,
                "separator_after": false,
                "label": "Desactivar",
                "action": function (obj) {
                    open_confirm_modal('deactivate');
                }
            };
        }
    }

    return items;
}

/*
    Eventos del plugin
    http://wp.wikirex.com/2014/04/13/contextmenu-plugin/
    Los eventos para mover, seleccionar, crear y borrar un nodo aplican la acción en la base de datos con ajax
 */
$(document).ready(function () {
    var to = false;
    $('#campo_buscar').keyup(function () {
        if(to) { clearTimeout(to); }
        to = setTimeout(function () {
            var value = $('#campo_buscar').val();
            $('#tree').jstree(true).search(value);
        }, 250);
    });

    $("#tree").on('open_node.jstree', function (event, data) {
        if(data.node.type != 'disabled'){
            data.instance.set_type(data.node, 'opened');
        }
    });

    $("#tree").on('close_node.jstree', function (event, data) {
        if(data.node.type != 'disabled'){
            data.instance.set_type(data.node, 'closed');
        }
    });

    $("#tree").on('select_node.jstree', function (event, object) {
        current = object.node.id;
    });

    $("#tree").on('create_node.jstree', function (event, object) {
        //console.log('create ' + object.node.id);
    });

    $("#tree").on('rename_node.jstree', function (event, object) {
        //console.log('rename ' + object.node.id);
    });

    $("#tree").on('ready.jstree', function (e, data) {
        data.instance.close_all();
        var node = $(this).jstree(true).get_node(-1);
        $(this).jstree("select_node", node);
        current = -1;
        $(this).jstree("open_node", node);
    });
});