import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { urlAMQP } from './main';

@Module({
  imports: [


    ClientsModule.register([
      {
        name: 'DB_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            urlAMQP,
          ],
          queue: 'db_queue',
          queueOptions: {
            durable: false
          },
        },
      },

      {
        name: 'AUTH_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            urlAMQP
          ],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
        },
      },

      
    ]),


  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
