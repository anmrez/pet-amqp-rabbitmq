import { IUser, UserService } from './user.service';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {

  logger = new Logger( 'User controller' )

  constructor(
    private userService: UserService
  ){}


  @MessagePattern( 'createUser' )
  registration(
    user: IUser
  ){

    this.logger.log( 'create: ' + user.username )
    return this.userService.create( user )
    
  }
  
  
  @MessagePattern( 'getEmailByUsername' )
  getEmailByUsername( username: string ){
    
    this.logger.log( 'getEmailByUsername: ' + username )
    return this.userService.getEmailByUsername( username )
    
  }


  @MessagePattern( 'getEmail' )
  getEmail( email: string ){
    
    this.logger.log( 'getEmail: ' + email )
    return this.userService.getEmail( email )
    
  }

  
  @MessagePattern( 'getUsers' )
  getAll(){
    
    this.logger.log( 'get all users' )
    return this.userService.getAll()

  }



}
