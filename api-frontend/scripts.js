$(document).ready(function() {

  $.getJSON('example.json', function(data) {
    var output = "<ul>";
    for (var i in data) {
      output += "<li>" + data[i].timestamp + "--" + data[i].author + ": " + data[i].text + "</li>";
    }

    output += "</ul>";
    document.getElementById("results").innerHTML = output;
  });

})
