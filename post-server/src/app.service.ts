import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IPostCreate } from './app.controller';

interface IPost {

  id: number
  author: string
  title: string,
  content: string
  created: Date

}



@Injectable()
export class AppService {


  constructor(
    @Inject( 'DB_CLIENT' ) private readonly dbClient: ClientProxy,
    @Inject( 'AUTH_CLIENT' ) private readonly authClient: ClientProxy,
  ){}


  async create( data: IPostCreate, author: string ){

    let post: IPost = {
      id: new Date().getTime(),
      author: author,
      title: data.title,
      content: data.content,
      created: new Date()
    }

    return this.dbClient.send( 'createPost', post )
    
  }
  

  getAll(){
    
    console.log( 'get all service' )
    return this.dbClient.send( 'getPosts', '' )
    
  }


  getPostById( id: number ){
    
    return this.dbClient.send( 'getPostById', id )

  }


  decoding( header: string ) {

    return this.authClient.send( 'decoding', header ).toPromise()

  }

}
