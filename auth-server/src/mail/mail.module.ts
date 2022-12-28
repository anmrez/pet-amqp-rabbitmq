import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as path from 'path'
import { MAIL } from 'src/main';

@Module({
  imports: [

    MailerModule.forRoot({
      transport: {
        host: MAIL.host,
        port: MAIL.port,
        logger: MAIL.logger,
        secure: MAIL.secure,
        auth: {
          user: MAIL.user,
          pass: MAIL.password
        }
      },
      template: {
        dir: path.join( __dirname, 'templates' ),
        adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),

  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
