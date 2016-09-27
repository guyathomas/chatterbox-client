
/*=====================================
===============GET request=============
======================================*/
$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/messages',
    data: {"order":"-createdAt"},
    success: function(messages) {
      var array = messages.results;
      for (var i = 0; i < array.length; i++) {
        var html = htmlTemplate(array[i]);
        $('.messageContainer').prepend(html);
      }
    }
  });
  $('#submitBtn').on('click', function(event) {
    event.preventDefault();
    var newMessage = $('#newMessage').val();
    postMessage(newMessage);
  });
});

// Template for sticking message on HTML  

var htmlTemplate = function (message) {
  var msgPanel = $('<div class="msgPanel"></div>');
  msgPanel.append('<p>' + message.username + '</p>');
  msgPanel.append('<p>' + htmlEscape(message.text) + '</p>');
  return msgPanel;
};

//Escaping the messages we recieve so we don't get trolled
var htmlEscape = function (str) {
  console.log("str: ", str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


/*=====================================
==============POST request=============
======================================*/
var postMessage = function(message) {
  var messageObj = {};
  messageObj.text = message;
  messageObj.username = 'Marcus';

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(messageObj),
    contentType: 'application/json',
    // success: function (message) {
    //   $('.messageContainer').prepend('<p>' + messageObj.text + '</p>');
    // },
    error: function (data) {
       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};





