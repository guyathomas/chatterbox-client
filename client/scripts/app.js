
/*=====================================
===============GET request=============
======================================*/
var roomNames = [];
var friends = [];
$(document).ready(function() {

  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/messages',
    data: {'order': '-createdAt'},
    success: function(messages) {
      var array = messages.results;
      for (var i = 0; i < array.length; i++) {
        var html = htmlTemplate(array[i]);
        $('.messageContainer').prepend(html);
      }

      //Create the room dropdown menu
      roomNames = getRoomNames(array);
      $select = $('.dropdown');
      for (room in roomNames) {
        var option = $('<option value="' + roomNames[room] + '"' + '>' + roomNames[room] + '</option>');
        $select.append(option);
      }
    }
  });
  
  $('#submitBtn').on('click', function(event) {
    event.preventDefault();
    var newMessage = $('#newMessage').val();
    postMessage(newMessage);
  });

  $( '.dropdown' ).change(function(event) {
    $.ajax({
      type: 'GET',
      url: 'https://api.parse.com/1/classes/messages',
      data: {'order': '-createdAt'},
      success: function(messages) {
        var array = messages.results;
        var room = $('.dropdown').val();
        var roomArray = _.filter(array, function(item) { return item.roomname === room; });
        for (var i = 0; i < roomArray.length; i++) {
          var html = htmlTemplate(roomArray[i]);
          $('.messageContainer').prepend(html);
        }
      }
    });
  });

  $('.messageContainer').on('click', '.username',  function (event) {
    var name = this.innerHTML;
    if (friends.indexOf(name) === -1) {
      friends.push(this.innerHTML);      
    }

  });

});

//Get all room names into an array
var getRoomNames = function(array) {
  var storage = ['All rooms'];
  for (var i = 0; i < array.length; i++) {
    var element = array[i].roomname;
    if (storage.indexOf(element) === -1 && element) {
      storage.push(element);
    }
  }
  return storage;
};

// Template for sticking message on HTML  

var htmlTemplate = function (message, friend) {
  var msgPanel = $('<div class="msgPanel"></div>');
  
  //Add friend styling
  if (friend) {
    msgPanel.append('<p class="username friend">' + message.username + '</p>');    
  } else {
    msgPanel.append('<p class="username">' + message.username + '</p>');    
  }
  msgPanel.append('<p>' + htmlEscape(message.text) + '</p>');
  
  return msgPanel;
};

//Escaping the messages we recieve so we don't get trolled
var htmlEscape = function (str) {
  if (!(str)) { return ''; }

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


//Spam control
//Escape pink man
//Waiting image while refreshing
//Add friends
//See messages by friends
// save friends so they are not forgotten on reload





