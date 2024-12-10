import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: configService.get<string>('MQTT_BROKER_URL'),
    },
  });

  app.enableCors({
    credentials: true,
    origin: configService.get<string>('CORS_ORIGIN')
      ? configService.get<string>('CORS_ORIGIN').split(',')
      : ['http://localhost:5173'],
  });

  app.use(helmet());

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
