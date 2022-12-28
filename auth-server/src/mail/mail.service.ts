import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {


  constructor(
    private mailerService: MailerService
  ) {}


  async sendLoginLetter( username: string, email: string, token: string ){

    let link = 'http://192.168.0.2:5001/authorization/' + token

    await this.mailerService.sendMail({

      to: email,
      from: 'local.nest@mail.ru', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './main.pug', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        username,
        link
      },
      
    });

  }


}
