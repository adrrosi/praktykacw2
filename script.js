var links = [];
$(document).ready(getLinks)
$("#add").click(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/links",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            title: $("#title").val(),
            description: $("#description").val(),
            url: $("#url").val()
        }),
        success: function (res) {
            getLinks();
            $("#title").val("");
            $("#description").val("");
            $("#url").val("");
        }
    })
})

function getLinks() {
    $("#links").empty();
    $.get("http://localhost:8080/links", function (response) {
        links = response._embedded.links;
        links.forEach(function (link, i) {
            console.log(i)
            $("#links").append('<li class="list-group-item">' + '<strong>' + link.title + '</strong>' +
                '<p>' + link.description + '</p>' + '<p><a href="' + link.url + '">Przejdź do strony</a></p>' +
                '<button type="button" class="btn btn-danger mr-1" onclick="deleteLink(\'' + link._links.self.href + '\');">Usuń</button>' + '<button type="button" class="btn btn-success" onclick="editLink(' + i + ')">Edytuj</button>' + '</li>' );
        })
    });
}

function deleteLink(url) {
    $.ajax({
        type: "DELETE",
        url: decodeURIComponent(url),
        success: getLinks()
    })
}

function saveLink() {
    $.ajax({
        type: 'PUT',
        url: $('#urlToSave').val(),
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            title: $('#editTitle').val(),
            description: $('#editDescription').val(),
            url: $('#editUrl').val()
        }),
        success: function (response) {
            getLinks();
            $('#editTitle').val('');
            $('#editDescription').val('');
            $('#editUrl').val('');
            $('#urlToSave').val('');

        }
    })
}

function editLink(index) {
    var link = links[index];
    $('#editTitle').val(link.title);
    $('#editDescription').val(link.description);
    $('#editUrl').val(link.url);
    $('#urlToSave').val(link._links.self.href);
}