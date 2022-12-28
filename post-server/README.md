# Post server


## Config
- Open: 'src/mait.ts' and change the 'urlAMQP' address to your AMQP address.
- Change the 'PORT' inside 'src/main.ts' to the one you like.

#
## Install
    npm install ci

#
## Run
    npm run start

#
## HTTP request

 - POST 'post/create' - create the post;
 - GET  'posts' - get all posts;
 - GET  'post/:id' - get the post with specified ID