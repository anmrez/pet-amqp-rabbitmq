import { Controller, Get, Headers } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {

  logger = new Logger( 'Auth controller' )

  constructor(
    private readonly appService: AppService
  ) {}


  @MessagePattern( 'decoding' )
  decoding(
    header: string,
  ): string {

    this.logger.log( 'decoding jwt' )
    return this.appService.decoding( header )

  }


  @Get()
  get(){
    return 'hi'
  }



}
