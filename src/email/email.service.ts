import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

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
      to,
      html: message,
      from: 'contact@smart-home.org.pl',
      subject: `Activate your account in the Smart Home App`,
    });

    return email;
  }
}
