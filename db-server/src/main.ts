import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

export const urlAMQP: string = 'amqps://YOURAMQPADDRESS'

async function bootstrap() {

  let configMQ = {
    transport: Transport.RMQ,
    options: {
      urls: [
        urlAMQP
        // 'amqps://htbldjnr:4T151wvrmy2QM1xoFgcrhc-DPSox2BrW@gull.rmq.cloudamqp.com/htbldjnr'
      ],
      queue: 'db_queue',
      queueOptions: {
        durable: false
      },
    }
  }

  const app = await NestFactory.createMicroservice( AppModule, configMQ );
  await app.listen();

  new Logger('DB server').log( 'DB server started' )

}
bootstrap();
