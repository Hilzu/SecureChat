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
    var html = '<ul id="messagesList">';
    $.each(messages, function(index, msg) {
      html += '<li>';
      html += '<span class="timestamp">' + msg.timestamp + '</span>';
      html += '<span class="sender">' + msg.sender + '</span>';
      html += ' -> ';
      html += '<span class="receiver">' + msg.receiver + '</span>';
      html += '<span class="message">' + msg.message + '</span>';
      html += '</li>';
    });
    html += '</ul>';
    $('#messages').html(html);
  });
};

$(document).ready(function() {
  app.loadPublicKey();
  app.loadMessages();
});
