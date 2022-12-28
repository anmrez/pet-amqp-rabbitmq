import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [

    // AuthModule,

    PostModule,

    UserModule

  ],

  

  controllers: [
    // AppController
  UserController],

  

  providers: [UserService],

  // providers: [
  //   AppService, 
  //   AuthService
  // ],


})
export class AppModule {}
