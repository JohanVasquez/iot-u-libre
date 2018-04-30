/**
 * Created by Diego Monsalve on 7/04/17.
 * Script para gestionar la estructura de arbol en el modelo de gestión documental de licitaciones con el plugin jstree
 * Documentación completa en: https://www.jstree.com/
 */

var previous = [];
var next = [];
var current = null;
var focused = null;

function get_str_current_date() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+'/'+yyyy;
}

function open_node_content(id) {
    var tree = $("#tree");
    tree.jstree("deselect_all");
    tree.jstree(true).select_node(id);
}

function set_node_content(node, title, content){
    $("#node_name").html(title);
    $("#node_content").html(content);

    // Update navigation
    if(current != node.id){
        if(current != null){
            previous.push(current);
        }
        current = node.id;
        check_buttons();
    }
}

function check_buttons() {
    if(next.length == 0) {
        $("#next_button").addClass('disabled');
    }else{
        $("#next_button").removeClass('disabled');
    }

    if(previous.length == 0) {
        $("#prev_button").addClass('disabled');
    }else{
        $("#prev_button").removeClass('disabled');
    }
}

function update_node_content() {
    if(current != null){
        open_node_content(current);
    }
}

$("#prev_button").on('click', function () {
    if(current != null){
        next.push(current);
    }
    current = previous[previous.length - 1];
    previous.pop();
    update_node_content();
    check_buttons();
});

$("#next_button").on('click', function () {
    if(current != null){
        previous.push(current);
    }
    current = next[next.length - 1];
    next.pop();
    update_node_content();
    check_buttons();
});

check_buttons();

function create_node_action(type){
    if(current != null){
        var tree = $("#tree").jstree(true);
        var node = tree.get_node(current);
        create_node(node, type);
    }
}

function rename_node_action(){
    if(current != null && focused != null){
        var tree = $("#tree").jstree(true);
        var node = tree.get_node(focused);
        var text = $("#nombre_nodo").val();
        if(text != ''){
            rename_node(node, text);
            $("#modal_nombre").modal('hide');
            $("#nombre_nodo").val('');
            $("#div_form_nombre").removeClass('has-error');
            $("#div_mensaje_nombre").html('');
        }else{
            $("#div_form_nombre").addClass('has-error');
            $("#div_mensaje_nombre").html('Este campo no puede ser vacío');
        }
    }
}

function restore_node_action(id, type) {
    if(type == 0){
        node_type = 'file';
    }else{
        node_type = 'folder';
    }
    restore_node(id, node_type);
}

function delete_permanently_node_action(id, type) {
    if(type == 0){
        node_type = 'file';
    }else{
        node_type = 'folder';
    }
    delete_permanently_node(id, node_type);
}

// Funciones que ejecutan las acciones crear, cambiar nombre, eliminar, mover

function create_node(node, type) {
    var tree = $("#tree").jstree(true);

    if(node.id.indexOf('.') != -1){
        node = tree.get_node(node.parent);
    }

    if(type == 'folder') {
        var $node = tree.create_node(node);
        tree.set_type($node, 'f-closed');
        tree.open_node(node);
        tree.set_type(node, 'f-open');
    }else{
        $("#id_carpeta").val(node.text);
        $("#id_carpeta_id").val(node.id);
        $("#modal-archivo").modal('show');
    }
}

function rename_node(node, text) {
    var rename = $("#tree").jstree('rename_node', node , text);
    if(!rename){
        toastr["warning"]('El nombre no es válido, ya existe un archivo/carpeta con el mismo nombre');
    }
}

function remove_node(node){
    var tipo = '';
    var mensaje = '';
    if(node.icon == 'fa fa-file text-inverse'){
        tipo = 'Archivo';
        mensaje = '¿Está seguro que desea eliminar este archivo?';
    }else{
        tipo = 'Carpeta';
        mensaje = '<b>Todo el contenido de la carpeta se eliminará.</b><br>¿Está seguro que desea eliminar esta carpeta?';
    }
    $("#modal .modal-header h4").html('Eliminar '+tipo);
    $("#modal .modal-body p").html(mensaje);
    $("#action_modal").unbind('click');
    $("#action_modal").on("click", function () {
        var node_type = 'folder';
        var id = node.id;
        //var parent = node.parent;

        if(id.indexOf('.') != -1){
            id = id.split('.')[1];
            node_type = 'file';
        }

        $.post(url,
            {'id': id, 'csrfmiddlewaretoken': token, 'event': 'delete', 'type': node_type},
            function(response){
                if(response['status']){
                    if(node_type == 'folder'){
                        toastr["success"]('Carpeta eliminada correctamente');
                    }else{
                        toastr["success"]('Archivo eliminado correctamente');
                    }
                    if(node.id == current){
                        current = node.parent;
                    }
                    $("#tree").jstree(true).delete_node(node);
                    update_node_content();

                }else if(response['root']){
                    toastr["warning"]('No puedes eliminar esta carpeta');
                }
            }
        );
        $("#modal").modal('toggle');
    });
    $("#modal").modal('toggle');
}

function restore_node(id, type) {
    var tipo = 'Carpeta';
    var mensaje = '¿Está seguro que desea restaurar esta carpeta y su contenido?';
    if(type == 'file'){
        tipo = 'Archivo';
        mensaje = '¿Está seguro que desea restaurar este archivo?';
    }
    $("#modal .modal-header h4").html('Restaurar '+tipo);
    $("#modal .modal-body p").html(mensaje);
    $("#action_modal").unbind('click');
    $("#action_modal").on("click", function () {
        $.post(url,
            {'id': id, 'csrfmiddlewaretoken': token, 'event': 'restore', 'type': type},
            function(response){
                if(response['status']){
                    if(type == 'folder'){
                        toastr["success"]('Carpeta restaurada correctamente');
                    }else{
                        toastr["success"]('Archivo restaurado correctamente');
                    }
                    location.reload();
                }
            }
        );
        $("#modal").modal('toggle');
    });
    $("#modal").modal('toggle');
}

function delete_permanently_node(id, type) {
    var tipo = 'Carpeta';
    var mensaje = '¿Está seguro que desea <b>eliminar de forma permanente</b> esta carpeta y su contenido?';
    if(type == 'file'){
        tipo = 'Archivo';
        mensaje = '¿Está seguro que desea <b>eliminar de forma permanente</b> este archivo?';
    }
    $("#modal .modal-header h4").html('Eliminar para siempre '+tipo);
    $("#modal .modal-body p").html(mensaje);
    $("#action_modal").unbind('click');
    $("#action_modal").on("click", function(){
        $.post(url,
            {'id': id, 'csrfmiddlewaretoken': token, 'event': 'delete-permanently', 'type': type},
            function(response){
                if(response['status']){
                    if(type == 'folder'){
                        toastr["success"]('Carpeta eliminada correctamente');
                    }else{
                        toastr["success"]('Archivo eliminado correctamente');
                    }
                    update_node_content();
                }
            }
        );
        $("#modal").modal('toggle');
    });
    $("#modal").modal('toggle');
}

//Constructor del arbol
$("#tree").jstree({
    "core" : {
        "themes" : {
            "responsive": false
        },
        // Un nodo no puede estar dentro de otro nodo que sea tipo archivo, ni tampoco fuera del nodo principal
        'check_callback': function(operation, node, node_parent, node_position, more) {
            // operation can be 'create_node', 'rename_node', 'delete_node', 'move_node' or 'copy_node'
            // in case of 'rename_node' node_position is filled with the new node name
            if(node_parent.id == 'papelera' || node.id == 'papelera'){
                return false;
            }
            if (operation === "move_node") {
                if(node_parent.icon == 'fa fa-file' || node_parent.id == node.parent || node_parent.id == '#'){
                    return false;
                }else{
                    return true;
                }
            }
            return true;  //allow all other operations
        },
        "strings" : {
            'New node': 'Nueva carpeta'
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
    "plugins" : ["contextmenu", "dnd", "state", "types", "unique", "sort", "search"],
    'types' : {
        'f-open' : {
            'icon': 'fa fa-folder-open text-warning'
        },
        'f-closed' : {
            'icon': 'fa fa-folder text-warning'
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

	if(node.id == 'papelera'){
	    return {};
    }

    if(node.id.indexOf('.') == -1) {
        items['create'] = {
            "separator_before": false,
            "separator_after": false,
            "label": "Nuevo",
            "action": false,
            "submenu": {
                "create_folder": {
                    "label": "Carpeta",
                    "action": function (obj) {
                        create_node(node, 'folder');
                    }
                },
                "create_file": {
                    "label": "Archivo",
                    "action": function (obj) {
                        create_node(node, 'file')
                    }
                }
            }
        };
    }



    items['Remove'] = {
        "separator_before": true,
        "separator_after": false,
        "label": "Eliminar",
        "action": function(obj){
            remove_node(node);
        }
    };

    return items;
}

/*
    Eventos del plugin
    http://wp.wikirex.com/2014/04/13/contextmenu-plugin/
    Los eventos para mover, seleccionar, crear y borrar un nodo aplican la acción en la base de datos con ajax
 */
$(document).ready(function () {

    // Evento para buscar documento o carpeta por palabra clave
    var to = false;
    $('#campo_buscar').keyup(function () {
        if(to) { clearTimeout(to); }
        to = setTimeout(function () {
            var value = $('#campo_buscar').val();
            $('#tree').jstree(true).search(value);
        }, 250);
    });

    $("#tree").on('move_node.jstree', function (event, object) {
        //console.log('move ' + object.node.id);

        var node_type = 'folder';
        var id = object.node.id;

        if(id.indexOf('.') != -1){
            id = id.split('.')[1];
            node_type = 'file';
        }

        $.post(url, {'id': id, 'csrfmiddlewaretoken': token, 'event': 'move', 'type': node_type,
                'parent_id': object.node.parent},
            function(response){
                if(response['status']){
                    if(node_type == 'folder'){
                        toastr["success"]('Carpeta movida correctamente');
                    }else{
                        toastr["success"]('Archivo movido correctamente');
                    }
                    var tree = $('#tree').jstree(true);
                    tree.open_node(object.node.parent);
                    tree.set_type(object.node.parent, 'f-open');
                    if(tree.get_node(object.old_parent).children.length == 0){
                        tree.close_node(object.old_parent);
                        tree.set_type(object.old_parent, 'f-closed');
                    }
                }
            }
        );
        update_node_content();
    });

    $("#tree").on('open_node.jstree', function (event, data) {
        data.instance.set_type(data.node, 'f-open');
    });

    $("#tree").on('close_node.jstree', function (event, data) {
        data.instance.set_type(data.node, 'f-closed');
    });

    $("#tree").on('select_node.jstree', function (event, object) {
        //console.log('select ' + object.node.id);
        var  html = '';
        if(object.node.id == 'papelera'){
            $.post(url, {'csrfmiddlewaretoken': token, 'event': 'trash', 'licitacion_id': licitacion_id},
                function(response){
                    if(response['status']){
                        if(response['files'].length + response['folders'].length > 0){
                            if(response['files'].length > 0) {
                                html += '<h6>Archivos</h6>';
                                html += '<table class="table">';
                                html += '<tbody>';
                                for (var i = 0; i < response['files'].length; i++) {
                                    var file = response['files'][i];
                                    html += '<tr>';
                                    html += '<td>' + file['nombre'] + '</td>';
                                    html += '<td style="white-space: nowrap;" width="20px">';
                                    html += '<a href="javascript:;" title="Restaurar" onclick="restore_node_action(' + file['pk'] + ', 0)" style="margin-right: 5px">';
                                    html += '<i class="fa fa-refresh"></i>';
                                    html += '</a>';
                                    html += '<a href="javascript:;" onclick="delete_permanently_node_action(' + file['pk'] + ', 0)" title="Eliminar de forma permanente" >';
                                    html += '<i class="fa fa-trash"></i>';
                                    html += '</a>';
                                    html += '</td>';
                                    html += '</tr>';
                                }
                            }
                            if(response['folders'].length > 0) {
                                html += '</tbody></table>';
                                html += '<h6>Carpetas</h6>';
                                html += '<table class="table">';
                                html += '<tbody>';
                                for (var i = 0; i < response['folders'].length; i++) {
                                    var folder = response['folders'][i];
                                    html += '<tr>';
                                    html += '<td>' + folder['nombre'] + '</td>';
                                    html += '<td style="white-space: nowrap;" width="20px">';
                                    html += '<a href="javascript:;" title="Restaurar" onclick="restore_node_action(' + folder['pk'] + ', 1)" style="margin-right: 5px">';
                                    html += '<i class="fa fa-refresh"></i>';
                                    html += '</a>';
                                    html += '<a href="javascript:;" title="Eliminar de forma permanente" onclick="delete_permanently_node_action(' + folder['pk'] + ', 1)">';
                                    html += '<i class="fa fa-trash"></i>';
                                    html += '</a>';
                                    html += '</td>';
                                    html += '</tr>';
                                }
                                html += '</tbody></table>';
                            }
                        }else{
                            html = '<div class="alert alert-info m-r-10" role="alert">La papelera está vacía</div>';
                        }
                        set_node_content(object.node, object.node.text, html)
                    }else{
                        console.log('error al consultar papelera');
                    }
                }
            );
        } else {
            if (object.node.id.indexOf('.') != -1) {
                var extensions = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'svg'];
                if (extensions.indexOf(object.node.original.extension) == -1) {
                    html = '<a href="' + object.node.original.path + '">Descargar</a>'
                    html += '<embed src="' + object.node.original.path + '" style="width:98%; height: 600px;" type="application/pdf"/>';

                } else {
                    html = '<div class="m-r-15"><a title="Click para descargar" href="' + object.node.original.path + '" download="' + object.node.text + '"><p>Descargar</p><img src="' + object.node.original.path + '" width="100%"></a></div>';

                }
            } else {
                for (var i = 0; i < object.node.children.length; i++) {
                    var child = $('#tree').jstree(true).get_node(object.node.children[i]);
                    var type = 'folder';
                    var icon = 'folder-open';

                    if (child.id.indexOf('.') != -1) {
                        type = 'file';
                        icon = 'file';
                    }
                    var text = child.text;
                    var date = child.original.date;
                    var id = child.id;

                    html += '<div class="col-md-3" style="padding: 0px;">';
                    html += '<div class="item ' + type + '">';
                    html += '<a href="javascript:;" onclick="open_node_content(' + id + ')" ';
                    html += 'class="context-menu-one" data-type="' + type + '" data-id="' + id + '">';
                    html += '<div class="icon">';
                    html += '<i class="fa fa-' + icon + '"></i>';
                    html += '</div>';
                    html += '<div class="file-name">';
                    html += text;
                    html += '<br>';
                    html += '<small>' + date + '</small>';
                    html += '</div>';
                    html += '</a>';
                    html += '</div>';
                    html += '</div>';
                }
                if (html == '') {
                    html = '<div class="alert alert-info m-r-10" role="alert">La carpeta está vacía</div>';
                }
            }
            set_node_content(object.node, object.node.text, html);
        }
        if(object.node.id == 'papelera' || object.node.id.indexOf('.') != -1){
            $("#dropdown_nuevo").hide();
        }else{
            $("#dropdown_nuevo").show();
        }
    });

    $("#tree").on('create_node.jstree', function (event, object) {
        var tree = $(this).jstree(true);
        var node = object.node;
        var node_type = 'folder';
        if(node.icon == 'fa fa-file'){
            node_type = 'file';
        }
        var id = node.id;
        var parent = tree.get_parent(node);

        $.post(url,
            {'id': id, 'text': node.text, 'csrfmiddlewaretoken': token, 'event': 'create',
                'type': node_type, 'licitacion_id': licitacion_id, 'parent_id': parent},
            function(response){
                if(response['status']){
                    if(node_type=='folder'){
                        tree.set_id(node, response['id']);
                        node.original['date'] = get_str_current_date();
                        toastr["success"]('Carpeta registrada correctamente');
                        update_node_content();
                    }else{
                        tree.set_id(node, parent + '.' + response['id']);
                        toastr["success"]('Archivo registrado correctamente');
                    }
                }
            }
        );
    });

    $("#tree").on('rename_node.jstree', function (event, object) {
        var node_type = 'folder';
        var id = object.node.id;

        if(id.indexOf('.') != -1){
            id = id.split('.')[1];
            node_type = 'file';
        }

        $.post(url,
            {'id': id, 'text': object.node.text, 'csrfmiddlewaretoken': token, 'event': 'rename',
                'type': node_type},
            function(response){
                if(response['status']){
                    if(node_type == 'folder'){
                        toastr["success"]('Carpeta renombrada correctamente');
                    }else{
                        toastr["success"]('Archivo renombrado correctamente');
                    }
                }
            }
        );

        update_node_content();
    });

    function crear_archivo(){
        tree = $('#tree').jstree(true);
        if(node.id.indexOf('.') != -1){
            node = tree.get_parent(node);
        }else{
            node = tree.get_node(node.id);
        }

        var match = 'Nuevo archivo';
        if(typeof node.children !== 'undefined'){
            var index = 0;
            for(var i=0; i<node.children.length; i++){
                if(tree.get_node(node.children[i]).text == match){
                    index += 1;
                    match = 'Nuevo archivo' + ' (' + index + ')';
                    i=-1;
                }
            }
        }

        var $node = tree.create_node(node, {text: match, icon: 'fa fa-file'}, 'last', function(){
            //tree.open_node(node);
            tree.set_type(node, 'f-open');
        }, true);
    }
});
