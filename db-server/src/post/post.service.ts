import { HttpException, Injectable, Logger } from '@nestjs/common';
import { title } from 'process';

export interface IPost {

  id: number
  author: string
  title: string
  content: string
  created: Date

}


@Injectable()
export class PostService {


  posts: IPost[] = [
    {
      id: 1,
      author: 'admin',
      title: 'Post from admin',
      content: 'It is default post',
      created: new Date()
    },
    {
      id: 2,
      author: 'admin2',
      title: 'еще пост',
      content: 'Но на русском',
      created: new Date()
    }
  ]

  
  constructor(
    // there should be a connection to the database
  ){}


  create( post: IPost ){

    this.posts.push( post )
    return post

  }


  getAll(){ return this.posts }


  get( id: number ): IPost | HttpException {

    let post = this.fintByID( id )
    if ( post ) return post
    return new HttpException( 'Post not found', 400 );

  }


  private fintByID( id: number ): IPost{

    let index = 0
    while ( this.posts[ index ] !== undefined && id !== this.posts[ index ].id ) index++  

    return this.posts[index]

  }


}
