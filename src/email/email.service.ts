import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  async sendMail(to: string, token: string) {
    const linkHref = `${this.configService.getOrThrow<string>('FRONTEND_URL')}/register/${token}`;
    const message = `Verify your account by clicking this link:<br /> <a href="${linkHref}">${linkHref}</a>`;

    const email = await this.mailService.sendMail({
      from: 'test@test.com',
      to,
      subject: `How to Send Emails with Nodemailer`,
      html: message,
    });

    return email;
  }
}
