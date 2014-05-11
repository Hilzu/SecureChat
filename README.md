SecureChat
==========
Send secure messages to other users. The front-end doesn't work currently and is
pending a rewrite.

* Send messages to other users
* All users have a public/private key pair
* Message receiver is set using public key
* Messages are encrypted client-side
* Server saves encrypted messages and delivers them to clients
* Eavesdropping should be impossible, since server doesn't know the contents of
the messages


## Usage
    # Install all dependencies
    npm install

    # Start MongoDB on default port
    mongod

    # Start server
    npm start

## Developing
    # Run tests
    npm test

    # Watch for changes, restart server and check files with JSHint and JSCS
    npm install -g gulp
    gulp develop
