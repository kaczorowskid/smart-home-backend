import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  exports: [EmailService],
  providers: [EmailService],
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        verifyTransporters: true,
        transport: {
          service: configService.getOrThrow<string>('EMAIL_SERVICE'),
          auth: {
            user: configService.getOrThrow<string>('EMAIL_USERNAME'),
            pass: configService.getOrThrow<string>('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
})
export class EmailModule {}
