import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Test, type TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

const mockConfigService = {
  getOrThrow: jest.fn().mockReturnValue('https://smart-home.example.com'),
};

const mockMailerService = {
  sendMail: jest.fn(),
};

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    jest.clearAllMocks();
    mockConfigService.getOrThrow.mockReturnValue(
      'https://smart-home.example.com',
    );
  });

  describe('sendMail', () => {
    it('should send email with correct recipient and subject', async () => {
      mockMailerService.sendMail.mockResolvedValue({ messageId: 'msg-1' });

      await service.sendMail('user@example.com', 'abc123');

      expect(mockMailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'user@example.com',
          from: 'contact@smart-home.org.pl',
          subject: 'Activate your account in the Smart Home App',
        }),
      );
    });

    it('should include registration link with token in html', async () => {
      mockMailerService.sendMail.mockResolvedValue({ messageId: 'msg-1' });

      await service.sendMail('user@example.com', 'token-xyz');

      const callArgs = mockMailerService.sendMail.mock.calls[0][0];

      expect(callArgs.html).toContain(
        'https://smart-home.example.com/register/token-xyz',
      );
    });

    it('should return mailer response', async () => {
      const mailerResponse = { messageId: 'msg-1' };
      mockMailerService.sendMail.mockResolvedValue(mailerResponse);

      const result = await service.sendMail('user@example.com', 'token');

      expect(result).toEqual(mailerResponse);
    });
  });
});
