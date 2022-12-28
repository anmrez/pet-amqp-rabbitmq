# Database server

## Config
- Open: 'src/mait.ts' and change the 'urlAMQP' address to your AMQP address.

#
## Install
    npm install ci

#
## Run
    npm run start

#
## AMQP request

### post
 - 'createPost' - add a post to the 'posts' array;
 - 'getPosts' - get all posts from the 'posts' array;
 - 'getPostById' - get the post with specified ID from the 'posts' array;

### user
 - 'createUser' - add a user to the 'users' array;
 - 'getEmailByUsername' - get the email address of user with specified 'username' from the 'users' array;
 - 'getEmail - get the email address of user from the 'users' array;