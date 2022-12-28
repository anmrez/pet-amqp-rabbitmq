import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


export const urlAMQP: string = 'amqps://YOURAMQPADDRESS'
const PORT = 3000

server()
async function server() {

  const app = await NestFactory.create( AppModule );
  await app.listen( PORT, 
    () => new Logger('Post server').log( 'server started on ' + PORT ) 
  );

}




