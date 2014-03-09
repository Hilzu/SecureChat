var app = {};

app.loadPublicKey = function() {
  var publicKey;

  publicKey = localStorage.getItem('userPublicKey');
  if (publicKey === null) {
    publicKey = 'user' + Math.floor(Math.random() * 1000);
    localStorage.setItem('userPublicKey', publicKey);
  }

  $('#userPublicKey').append(publicKey);
  $('#sendMessageForm').find('input[name="sender"]').val(publicKey);
  app.publicKey = publicKey;
};

app.loadMessages = function() {
  $.getJSON('/messages', function(messages) {
    $('.messages').render(messages);
  });
};

app.chatView = function() {
  $('#content').load('chat.html', function() {
    app.loadPublicKey();
    app.loadMessages();

    $('#sendMessageForm').submit(function(event) {
      var formValues;
      event.preventDefault();
      formValues = $(this).serialize();
      $.post('/messages', formValues, function(data) {
        app.loadMessages();
      });
    });
  });
};

app.keysView = function() {
  $('#content').load('keys.html');
};

$(document).ready(function() {
  app.chatView();

  $('#chatViewLink').click(function(event) {
    event.preventDefault();
    app.chatView();
  });
  $('#keysViewLink').click(function(event) {
    event.preventDefault();
    app.keysView();
  })
});
