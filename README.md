# Pet projet AMQP (RabbitMQ)

![asd](https://raw.githubusercontent.com/anmrez/anmrez/main/pet-amql/schema.png)

## Includes 3 servers:
- Database server (stores the list posts and the list users)
- Post server (creates posts. sends and gets posts to and from the database server)
- Auth server (consists of 2 servers:)
  - HTTP server (works with the client)
  - AMQP server (works with the Post server)
  

