//var base_URL = 'http://:8080/api';
var base_URL = 'http://35.167.55.180:8080/api';

//init tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function() {

  $.getJSON(base_URL + '/admin/message', function(data) {

    for (var i in data) {
      var row = "<tr>";
      row += "<td><code>" + data[i].timestamp.replace("T", " ").replace("Z","") + "</code></td>";
      row += "<td>" + data[i].author + "</td>";
      row += "<td>" + data[i].text + "</td>";
      row += "</tr>";
      $('#results').append(row);
    }

    $('#progress').remove();
  });

})
