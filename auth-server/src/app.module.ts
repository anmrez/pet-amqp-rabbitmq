import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { JWTPassword } from './main';

@Module({
  imports: [
  
    JwtModule.register({
      secret: JWTPassword,
      signOptions: { expiresIn: '30d' }
    }),
  
    UserModule,
  
    MailModule,

  ],
  controllers: [
    AppController,
    // UserController
  ],
  providers: [
    AppService,
    // UserService
  ],
})
export class AppModule {}
