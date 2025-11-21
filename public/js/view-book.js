function viewBook() {
    var response =
    '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-book', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    response = JSON.parse(request.responseText);
    var html =
    ''
    for (var i = 0; i < response.length; i++)
    {
    html += '<tr>' +
    '<td>' + (i+1) + '</td>' +
    '<td>' + response[i].title + '</td>' +
    '<td>' + response[i].author + '</td>' +
    '<td>' + response[i].genre + '</td>' +
    '<td>' + response[i].status + '</td>' +
    '<td>' + 
    '<button type="button" class="btn btn-danger" onclick="deleteBook(\'' + response[i].id + '\')"> Delete</button>' +'</td>'+'</tr>'
    }
    document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
    }