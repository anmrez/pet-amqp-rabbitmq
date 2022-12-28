import { Controller, Get, Logger, Headers } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { AppService } from './app.service';


export interface IPostCreate{
  title: string
  content: string
}

@Controller( )
export class AppController {

  logger = new Logger('controller')

  constructor(private readonly appService: AppService) {}

  @Get( 'post/create' )
  async create(
    @Body() data: IPostCreate,
    @Headers() headers: Record < string, string >
  ) {

    let author = await this.appService.decoding( headers.authorization )

    return this.appService.create( data, author );
    
  }

  
  @Get( 'posts' )
  getAll(){
    
    this.logger.log( 'get all posts' )
    return this.appService.getAll( );

  }
  
  
  @Get( 'post/:id' )
  getPostById(
    @Param( 'id' ) id: any
  ){
    
    this.logger.log( 'find by id "' + id + '"' )
    return this.appService.getPostById( id );

  }

  


}
function RequestHeaders() {
  throw new Error('Function not implemented.');
}

