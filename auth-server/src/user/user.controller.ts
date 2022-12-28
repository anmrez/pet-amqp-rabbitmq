import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUser, IUserLogin, UserService } from './user.service';

@Controller()
export class UserController {


  constructor(
    private userService: UserService
  ){}


  @Post( 'registration' )
  registration(
    @Body() user: IUser
  ){

    return this.userService.registration( user )

  }


  @Get( 'users' )
  getAllUsers(){

    return this.userService.getAllUsers()

  }


  @Post( 'login' )
  login(
    @Body() data: IUserLogin
  ){
    
    console.log( data )
    return this.userService.login( data )

  }


  @Get( 'authorization/:hash' )
  authorization(
    @Param( 'hash' ) hash: string
  ){

    // here you need to redirect to the client 
    return this.userService.authorization( hash )

  }


}
