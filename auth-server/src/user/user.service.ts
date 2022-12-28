import { MailService } from '../mail/mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { JWTPassword } from 'src/main';


export interface IUser{

  username: string
  email: string
  
}

export interface IUserLogin {

  username?: string
  email?: string

}

interface ILink {

  username: string
  hash: string
  created_at: number

}

@Injectable()
export class UserService {


  loginLinks: ILink[] = []

 
  constructor(
    private jwtService: JwtService,
    @Inject( 'DB_CLIENT' ) private dbClient: ClientProxy,
    private mailService: MailService,
  ){}


  async registration( user: IUser ){

    let response = await this.dbClient.send( 'createUser', user ).toPromise()
    console.log( response )

    if ( response.status === 500 ) return response

    return {
      status: response.status,
      message: response.message,
      token: this.generateToken( user.username )
    }

  }


  getAllUsers(){

    return this.dbClient.send( 'getUsers', '' ).toPromise()

  }


  async login( data: IUserLogin ){

    let response: any
    
    if ( data.username ) response = await this.dbClient.send( 'getEmailByUsername', data.username ).toPromise()
    if ( data.email ) response = await this.dbClient.send( 'getEmail', data.email ).toPromise()
    if ( response.status === 400 ) return response
    
    let mail: string = response.data.email
    let username: string = response.data.username
    let hash = this.genarationLink()

    await this.mailService.sendLoginLetter( username, mail, hash ).catch( err => console.log( err ) )

    this.loginLinks.push({
      username: username,
      hash: hash,
      created_at: new Date().getTime()
    })

    return {
      status: 200,
      message: 'Ссылка на авторизацию отправлена на вашу почту'
    }

  }


  authorization( hash: string ){

    let index = 0
    while ( index < this.loginLinks.length && hash !== this.loginLinks[ index ].hash ) index++

    if ( this.loginLinks[ index ] === undefined ) return {
      status: 404,
      message: 'По этому запросу ничего не найдено'
    }
    

    let date = new Date().getTime()
    let differentTime = date - this.loginLinks[ index ].created_at
    let maxTime = 1000 * 60 // 1 minute

    if ( differentTime > maxTime ) {

      this.removeElementFromLoginLinks( index )
      return {
        status: 400,
        message: 'Время ссылки истекло'
      }

    } 
      

    let response = {
      status: 200,
      token: this.jwtService.sign( { username: this.loginLinks[ index ].username }, { secret: JWTPassword } )
    }

    this.removeElementFromLoginLinks( index )
    
    return response

  }


  // private ===


  private removeElementFromLoginLinks( index: number ){

    this.loginLinks.splice( index, 1 )

  }


  private generateToken( username: string ): string{

    return this.jwtService.sign( { username: username }, { secret: '123' } )

  }


  private genarationLink(): string {

    let length = 35
    let hash: string = ''

    while ( hash.length !== length ) {

      let random = Math.random()

      if ( random <= 0.2 ) hash += this.getCapitalLetter()
      if ( random > 0.2 && random <= 0.9 ) hash += this.getLetter()
      if ( random > 0.9 ) hash += this.getSpecChar()

      
    }
    
    if ( this.isHashFree( hash ) === false ) return this.genarationLink()
    return hash

  }


  private getCapitalLetter(): string {

    let capitalLetters = 'QWERTYUIOPASDFGHJKLZXCVBNMQWERT'
    let position = this.getRandomSymbol( capitalLetters.length )
    return capitalLetters[ position ]

  }


  private getLetter(): string {

    let letters = 'qwertyuiopasdfghjklzxcvbnmqwerty'
    let position = this.getRandomSymbol( letters.length )
    return letters[ position ]

  }


  private getSpecChar(): string {

    let specialCharacter = '~!@#$%^&*()№;%:?_+=-~!@#$'
    let position = this.getRandomSymbol( specialCharacter.length )
    return specialCharacter[ position ]

  }


  private getRandomSymbol( maxLength: number ): number {

    let random = Math.random() * maxLength
    random = Math.floor( random )
    return random

  }


  private isHashFree ( hash: string ): boolean {

    let index = 0
    while ( this.loginLinks.length !== index && this.loginLinks[ index ].hash !== hash ) index++

    if ( this.loginLinks[ index ] == undefined ) return true
    return false

  }

}
