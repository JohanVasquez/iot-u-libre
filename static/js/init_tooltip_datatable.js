$(document).ready(function () {
    var input = $(".dataTables_filter :input[type=search]");
    input.attr("title", "Recuerde que la búsqueda es sensible a la acentuación");
    input.tooltip({
        placement: "right",
        trigger: "focus"
    });
});