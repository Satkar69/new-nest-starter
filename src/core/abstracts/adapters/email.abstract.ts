import { ISendMailOptions } from '@nestjs-modules/mailer';

export abstract class IEmailService {
  abstract sendMail(sendMailOptions: ISendMailOptions): Promise<any>;
}
