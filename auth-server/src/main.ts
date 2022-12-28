import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

interface IMail{
  host: string
  user: string
  password: string
  port: number
  secure: boolean
  logger: boolean
}


const PORT = 3001
export const MAIL: IMail = {
  host: 'smtp.mail.ru',
  user: 'YOU',
  password: 'YOURPASSWORD',
  port: 465,
  secure: true,
  logger: false
}
export const JWTPassword = 'your-secret-word'


async function bootstrap() {
  
  const app = await NestFactory.create( AppModule );
  await app.listen( PORT );
  console.log( 'server started on ' + PORT + ' port' )

}
bootstrap();
