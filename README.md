SecureChat
==========

* Every user has a private/public key pair
* Users can get public keys of other users from the server
* Users send messages to other users encrypted with the public keys
* The server transmits and buffers the encrypted messages (direct connections not really possible because NAT and other crap)
* One message can have multiple recipients
* This should be secure from eavesdropping but still easy to use
* Made as a course work for NodeJS project at University of Helsinki.
