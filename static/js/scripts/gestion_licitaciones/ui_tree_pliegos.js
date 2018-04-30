/**
 * Created by Duvernei Ortiz on 6/oct/17.
 * Script para gestionar la estructura de arbol en el modelo de gestión documental de licitaciones con el plugin jstree
 * Documentación completa en: https://www.jstree.com/
 */

var previous = [];
var next = [];
var current = null;
var focused = null;

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
            if (operation === "move_node") {
                return false;
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
    contextmenu: {items: {}}
});

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

    $("#tree").on('open_node.jstree', function (event, data) {
        data.instance.set_type(data.node, 'f-open');
    });

    $("#tree").on('close_node.jstree', function (event, data) {
        data.instance.set_type(data.node, 'f-closed');
    });

    $("#tree").on('select_node.jstree', function (event, object) {
        //console.log('select ' + object.node.id);
        var  html = '';
        if (object.node.id.indexOf('.') != -1) {
            var extensions = ['png', 'jpg', 'jpeg', 'tif', 'tiff', 'svg'];
            if (extensions.indexOf(object.node.original.extension) == -1) {
                html = '<a href="' + object.node.original.path + '">Descargar</a>'
                html += '<embed src="' + object.node.original.path + '" style="width:98%; height: 600px;" type="application/pdf"/>';
            } else {
                html = '<div class="m-r-15"><a title="Click para descargar" href="' + object.node.original.path + '" download="' + object.node.text + '"><img src="' + object.node.original.path + '" width="100%"></a></div>';
            }
        }else {
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
    });

});