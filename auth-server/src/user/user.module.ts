import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailModule } from 'src/mail/mail.module';
import { urlAMQP } from 'src/listener';

@Module({

  imports:[

    MailModule,

    ClientsModule.register([
      {
        name: 'DB_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: [
            urlAMQP
          ],
          queue: 'db_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      
    ]),

  ],
  controllers:[
    UserController
  ],
  providers: [
    UserService,
    JwtService
  ]

})
export class UserModule {}
