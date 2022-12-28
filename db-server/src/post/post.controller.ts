import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IPost, PostService } from './post.service';

@Controller( 'post' )
export class PostController {

  logger = new Logger( 'post service' )

  constructor(
    private postService: PostService,
  ){}


  @MessagePattern( 'createPost' )
  async createPost( post: IPost ){

    return this.postService.create( post )
    
  }

  
  @MessagePattern( 'getPosts' )
  async getPosts(): Promise< IPost[] >{
    
    this.logger.log( 'get post' )
    return this.postService.getAll( )
    
  }


  @MessagePattern( 'getPostById' )
  async getByID( id: number ){

    return this.postService.get( Number( id ) )

  }

}
