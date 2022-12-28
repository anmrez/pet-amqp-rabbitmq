import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export const urlAMQP: string = 'amqps://YOURAMQPADDRESS'


microservice();
async function microservice() {
  let configMQ = {
    transport: Transport.RMQ,
    options: {
      urls: [
        urlAMQP
      ],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      },
    }
  }

  const app = await NestFactory.createMicroservice( AppModule, configMQ );
  await app.listen();

  new Logger('Auth server').log( 'auth server started' )

}

