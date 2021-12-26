$(document).ready(function () {
    var filter = 0;
    var fromTodoId = parseInt($("#fromTodoId").val());
    var toTodoId = parseInt($("#toTodoId").val());
    RetreiveData(filter, fromTodoId, toTodoId);

    
    // Sledeći kôd se može koristiti ako je u pitanju chebox.
    // Za konkretan primer je pogodnije primeniti radio tastere,
    // ali ako se radi o jednom checkbox-u kojim se filtrira prikaz,
    // npr. da se ignoriše unet opseg za TODOs, već da se prikažu
    // svi od 1 do 200 (ili koliko ih već ima), svaki put
    // mora da se proveri da li je čekiran ili ne

    // $('#showCompleted').on('change', function () {
    //     if ($('#showCompleted').is(':checked'))

    $('#showCompleted').click(function () {
            filter = 1;
            var fromTodoId = parseInt($("#fromTodoId").val());
            var toTodoId = parseInt($("#toTodoId").val());
            RetreiveData(filter, fromTodoId, toTodoId);
    });

    $("#showNotCompleted").click(function () {
            filter = 3;
            var fromTodoId = parseInt($("#fromTodoId").val());
            var toTodoId = parseInt($("#toTodoId").val());
            RetreiveData(filter, fromTodoId, toTodoId);
    });

    $("#showAll").click(function () {
            filter = 0;
            var fromTodoId = parseInt($("#fromTodoId").val());
            var toTodoId = parseInt($("#toTodoId").val());
            RetreiveData(filter, fromTodoId, toTodoId);
    });

    $("#showTodosInRange").click(function () {
        var fromTodoId = parseInt($("#fromTodoId").val());
        var toTodoId = parseInt($("#toTodoId").val());
        RetreiveData(filter, fromTodoId, toTodoId);
    });
});



function RetreiveData(filter, fromTodoId, toTodoId) {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            var tableData = "";
            var todoTable = document.getElementById("todoTable");
            $.each(myJson, function (index, todoItem) {
                if ((todoItem.id >= fromTodoId) && (todoItem.id <= toTodoId)) {
                    if (filter == 0) {
                        tableData += '<div class="col col-sm-6 col-sm-4 col-lg-4">' +
                            '<div class="card border-' + todoColor(todoItem.completed) + ' mb-3">' +
                            '<div class="card-header">' +
                            '<h3 class="card-title">UserId: ' + todoItem.userId + '</h3>' + '</div>' +
                            '<div class="card-body text-' + todoColor(todoItem.completed) + '">' +
                            '<h5>Id: ' + todoItem.id + '</h5>' +
                            '<p class="card-text">' + todoItem.title + '</p>' + '</div>' +
                            '<div class="card-footer">' +
                            '<div class="text-center"><a href="#" class="btn btn-' + todoItemCompleted(todoItem.completed) + '</a></div>' +
                            '</div>' +
                            '</div></div>';
                    }
                    if ((filter == 1) && (todoItem.completed == true)) {
                        tableData += '<div class="col col-sm-6 col-sm-4 col-lg-4">' +
                            '<div class="card border-' + todoColor(todoItem.completed) + ' mb-3">' +
                            '<div class="card-header">' +
                            '<h3 class="card-title">UserId: ' + todoItem.userId + '</h3>' + '</div>' +
                            '<div class="card-body text-' + todoColor(todoItem.completed) + '">' +
                            '<h5>Id: ' + todoItem.id + '</h5>' +
                            '<p class="card-text">' + todoItem.title + '</p>' + '</div>' +
                            '<div class="card-footer">' +
                            '<div class="text-center"><a href="#" class="btn btn-' + todoItemCompleted(todoItem.completed) + '</a></div>' +
                            '</div>' +
                            '</div></div>';
                    }
                    if ((filter == 3 && todoItem.completed == false)) {
                        tableData += '<div class="col col-sm-6 col-sm-4 col-lg-4">' +
                            '<div class="card border-' + todoColor(todoItem.completed) + ' mb-3">' +
                            '<div class="card-header">' +
                            '<h3 class="card-title">UserId: ' + todoItem.userId + '</h3>' + '</div>' +
                            '<div class="card-body text-' + todoColor(todoItem.completed) + '">' +
                            '<h5>Id: ' + todoItem.id + '</h5>' +
                            '<p class="card-text">' + todoItem.title + '</p>' + '</div>' +
                            '<div class="card-footer">' +
                            '<div class="text-center"><a href="#" class="btn btn-' + todoItemCompleted(todoItem.completed) + '</a></div>' +
                            '</div>' +
                            '</div></div>';
                    }
                }
            });
            todoTable.innerHTML = tableData;
        });
}

function todoItemCompleted(completed) {
    return completed == true ? 'success">Completed' : 'danger">Not Completed';
}
function todoColor(completed) {
    return completed == true ? 'success' : 'danger';
}