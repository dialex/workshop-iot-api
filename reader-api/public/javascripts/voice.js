var acceptInstruction = false;

var colours = {
  'red' : {
    'r' : 255,
    'g' : 0,
    'b' : 0
  },
  'green' : {
    'r' : 0,
    'g' : 255,
    'b' : 0
  },
  'blue' : {
    'r' : 0,
    'g' : 0,
    'b' : 255
  }
}

var sleep = function(){
  $('#mood').empty();
  $('#mood').append('<p>🙂</p>');
}

var notify = function(){
  $('#mood').empty();
  $('#mood').append('<p>🤔</p>');
}

var confirm = function(){
  $('#mood').empty();
  $('#mood').append('<p>😌</p>');
  $('#mood p').append('<p id="overlay">👌</p>');
}

var showInfo = function(info){
  $('#mood').empty();
  $('#mood').append('<p id="error">' + info + '</p>');
}

var informSuccess = function(){
  confirm();

  setTimeout(function(){
    sleep();
  }, 3000);

  acceptInstruction = false;
}

if (!('webkitSpeechRecognition' in window)) {
  showInfo('I\'m sorry but this app isn\'t supported on your browser');
} else {
  var final_transcript = "",
      recognition = new webkitSpeechRecognition();

  sleep();

  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      showInfo('info_no_speech');
    }
    if (event.error == 'audio-capture') {
      showInfo('info_no_microphone');
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
    }
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript = event.results[i][0].transcript;
        console.log('Decided! ' + final_transcript)
      } else {
        interim_transcript += event.results[i][0].transcript;
        console.log('Is it? ' + interim_transcript);
      }
    }

    switch (true) {
      case /hello reader/.test(final_transcript):
        recognition.stop();
        notify();

        acceptInstruction = true;

        break;
      case /toggle LED number .*/.test(final_transcript):
        if(acceptInstruction){
          $.get('/mapper/toggle?led=' + WtoN.convert(final_transcript.split('number ')[1]), function(){
            recognition.stop();
            informSuccess();
          })
        }
        break;
      case /LED number [a-zA-Z0-9]* = LED number [a-zA-Z0-9]*/.test(final_transcript):
        if(acceptInstruction){
          if(final_transcript.indexOf('delete') > -1){
            var explodedPhrase = final_transcript.replace('delete ', '').replace(/LED number /g,'').split(' = ');

            $.ajax({
              url: '/mapper/map?led=' + WtoN.convert(explodedPhrase[0]) + '&mappedLed=' + WtoN.convert(explodedPhrase[1]),
              type: 'DELETE',
              success: function(result) {
                informSuccess();
              }
            });
          } else {
            var explodedPhrase = final_transcript.replace(/LED number /g,'').split(' = ');

            $.get('/mapper/map?led=' + WtoN.convert(explodedPhrase[0]) + '&mappedLed=' + WtoN.convert(explodedPhrase[1]), function(){
              recognition.stop();
              informSuccess();
            })
          }
        }
        break;
      case /reset mappings/.test(final_transcript):
        if(acceptInstruction){
          $.ajax({
            url: '/mapper/reset',
            type: 'DELETE',
            success: function(result) {
              informSuccess();
            }
          });
        }
        break;
      case /set LED number [a-zA-Z0-9 ]*/.test(final_transcript):
        if(acceptInstruction){
          var explodedPhrase = final_transcript.toLowerCase().replace('set led number ', '').split(' ');

          $.get('/mapper/colour?led=' + WtoN.convert(explodedPhrase[0]) + '&red=' + colours[explodedPhrase[1]].r + '&green=' + colours[explodedPhrase[1]].g + '&blue=' + colours[explodedPhrase[1]].b, function(){
            recognition.stop();
            informSuccess();
          });
        }
        break;
    }

    recognition.onend = function() {
        recognition.start();
    };

  };

  recognition.start();
}
