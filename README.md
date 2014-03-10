SecureChat
==========
Made as a course work for NodeJS project at University of Helsinki.

* Send messages to other users
* All users have a public/private key pair
* Message receiver is set using public key
* Messages are encrypted client-side
* Server saves encrypted messages and delivers them to clients
* Eavesdropping should be impossible, since server doesn't know the contents of the messages


## Usage

    npm install # Install all dependencies
    mongod # Start MongoDB on default port
    npm start # Start server
