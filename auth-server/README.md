# Auth server

## Config
- Open: 'src/listener.ts' and change the 'urlAMQP' address to your AMQP address.
- Change the 'PORT' inside 'src/main.ts' to the one you like.
- Change the 'MAIL' inside 'src/main.ts' to your mail data.
- Change the 'JWTPassword' inside 'src/main.ts' to a more secure one.

#
## Install
    npm install ci

#
## Run
### microcervice
    npm run listener
### server
    npm run start

#
## AMQP request

 - 'decode' - decode the acces token and return result;

#
## HTTP request
 - POST 'registration' - create new user;
 - POST 'login' - send authorization message to email adrress of user;
 - GET 'users' - get the list of users;
 - GET 'authorization/:hash' - return the acces token;