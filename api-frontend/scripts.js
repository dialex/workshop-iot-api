var base_URL = 'http://localhost:8080/api';

$(document).ready(function() {

  $.getJSON(base_URL + '/admin/message', function(data) {
    var output = "<ul>";
    for (var i in data) {
      output += "<li><code>" + data[i].timestamp + " -- " + data[i].author + ": " + data[i].text + "</code></li>";
    }

    output += "</ul>";
    document.getElementById("results").innerHTML = output;
    $('#progress').remove();
  });

})
