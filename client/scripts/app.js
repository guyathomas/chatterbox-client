$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/messages',
    success: function(messages) {
      var array = messages.results;
      for (var i = 0; i < array.length; i++) {
        var html = htmlTemplate(array[i]);
        $('#main').append(html);
      }
    }
  });
});

var htmlTemplate = function (message) {
  var msgPanel = $('<div class="msgPanel"></div>');
  msgPanel.append('<p>' + message.username + '</p>');
  msgPanel.append('<p>' + message.text + '</p>');
  return msgPanel;
};