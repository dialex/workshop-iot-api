var base_URL = '/api';

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
