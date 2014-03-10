var app = {};

app.directives = {
  msg: {
    html: function(params) {
      var
        timestamp,
        sender,
        receiver,
        message,
        privateKey;

      timestamp = this.timestamp.toLocaleString();
      sender = app.hash(this.sender);
      receiver = app.hash(this.receiver);
      privateKey = localStorage.getItem('privateKey');
      message = app.decrypt(this.message, privateKey);
      return '<span class="timestamp">' + timestamp + '</span> ' +
             '<span class="sender">' + sender + '</span> ' +
             '-> <span class="receiver">' + receiver + '</span> ' +
             '<span class="message">' + message + '</span> '
    }
  }
};

app.decrypt = function(msg, key) {
  var crypt = new JSEncrypt();
  crypt.setKey(key);
  return crypt.decrypt(msg);
};

app.encrypt = function(msg, key) {
  var crypt;
  crypt = new JSEncrypt();
  crypt.setKey(key);
  return crypt.encrypt(msg);
};

app.hash = function(str) {
  var hashObj = new jsSHA(str, 'TEXT');
  return hashObj.getHash('SHA-1', 'HEX');
};

app.loadPublicKey = function() {
  var publicKey;

  publicKey = localStorage.getItem('publicKey');
  if (publicKey === null) {
    $('#flash').html('Public key not set');
  } else {
    $('#userPublicKey').append(publicKey.replace(/\n/g, '<br>'));
    $('#sendMessageForm').find('input[name="sender"]').val(publicKey);
    app.publicKey = publicKey;
  }
};

app.loadMessages = function() {
  var userHash = localStorage.getItem('publicKeyHash');
  $.getJSON('/messages/' + userHash, function(messages) {
    $('.messages').render(messages, app.directives);
  });
};

app.chatView = function() {
  $('#content').load('chat.html', function() {
    app.loadPublicKey();
    app.loadMessages();

    $('#sendMessageForm').submit(function(event) {
      var
        msg,
        message,
        receiverPublicKey;

      event.preventDefault();

      receiverPublicKey = $('textarea[name="receiver"]').val();
      message = $('textarea[name="message"]').val();
      message = app.encrypt(message, receiverPublicKey);

      msg = {
        sender: app.hash($('input[name="sender"]').val()),
        receiver: app.hash(receiverPublicKey),
        message: message
      };
      $.post('/messages', msg, function(data) {
        app.loadMessages();
      }, 'json');
    });
  });
};

app.keysView = function() {
  $('#content').load('keys.html', function() {
    $('#keysForm').submit(function(event) {
      var
        publicKey,
        privateKey,
        hash;

      event.preventDefault();
      publicKey = $('textarea[name="pubkey"]').val();
      hash = app.hash(publicKey);
      $.post('/users', {hash: hash, publicKey: publicKey}, function(data) {
        console.log(data);
      }, 'json');
      privateKey = $('textarea[name="privkey"]').val();
      localStorage.setItem('publicKey', publicKey);
      localStorage.setItem('publicKeyHash', hash);
      localStorage.setItem('privateKey', privateKey);
    });
  });
};

$(document).ready(function() {
  app.chatView();

  $('#chatViewLink').click(function(event) {
    event.preventDefault();
    $('#flash').html('');
    app.chatView();
  });

  $('#keysViewLink').click(function(event) {
    event.preventDefault();
    $('#flash').html('');
    app.keysView();
  });
});
