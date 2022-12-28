import { HttpException, Injectable, Logger } from '@nestjs/common';


export interface IUser{

  username: string
  email: string

}


@Injectable()
export class UserService {

  users: IUser[] = []
  logger = new Logger( 'User service' )

  constructor(

  ){}


  getAll(){ 
    console.log( this.users )
    return this.users }


  create ( user: IUser ){

    console.log( '--- Create ---' )

    let validate = this.validateUser( user )
    if ( validate ) return validate

    this.users.push( user )
    return {
      status: 200,
      message: 'Регистрация успешна'
    }

  }


  getEmailByUsername( username: string ){

    let index = 0
    while ( index < this.users.length && username !== this.users[ index ].username ) index++
   
    if ( this.users[ index ] === undefined ) return {
      status: 400,
      message: 'Пользователь не найден'
    }

    return {
      status: 200,
      data: this.users[ index ]
    }

  }


  getEmail( email: string ){

    let index = 0
    while ( index < this.users.length && email !== this.users[ index ].email ) index++

    if ( this.users[ index ] === undefined ) return {
      status: 400,
      message: 'Пользователь с такой почтой не найден'
    }

    return {
      status: 200,
      data: this.users[ index ]
    }

  }



  // private ====

  private validateUser ( user: IUser ): { status: number, message: string } | undefined {

    let existUsername: boolean = this.validateUserByName( user )
    this.logger.log( 'existUsername: ' + existUsername )
    if ( existUsername ) return {
      status: 500,
      message: 'Пользователь с таким именем уже существует'
    }
    
    let existEmail: boolean = this.validateUserByEmail( user )
    this.logger.log( 'existEmail: ' + existEmail )
    if ( existEmail ) return {
      status: 500,
      message: 'Пользователь с такой почтой уже существует'
    }

  }


  private validateUserByName ( user: IUser, username?: string ): boolean {

    let index = 0

    if ( user ) while ( 

      this.users[index] !== undefined &&
      user.username !== this.users[index].username && 
      index < this.users.length 

    ) index++

    if ( username ) while ( 

      this.users[index] !== undefined &&
      username !== this.users[index].username && 
      index < this.users.length 

    ) index++


    if ( this.users[index] ) return true
    return false

  }
  

  private validateUserByEmail ( user: IUser ): boolean {

    let index = 0
    while ( 

      this.users[index] !== undefined &&
      user.email !== this.users[index].email && 
      index < this.users.length 

    ) index++

    if ( this.users[index] ) return true
    return false

  }


}
