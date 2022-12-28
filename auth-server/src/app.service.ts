import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private jwt: JwtService
  ){}


  decoding( header: string ): string {

    let token = header.substring( 'Bearer '.length, header.length )
    let verify = this.jwt.verify( token )
    let username = verify.username

    return username

  }

  
}
