import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: configService.getOrThrow<string>('MQTT_BROKER_URL'),
    },
  });

  app.enableCors({
    credentials: true,
    origin: configService.getOrThrow<string>('CORS_ORIGIN')
      ? configService.getOrThrow<string>('CORS_ORIGIN').split(',')
      : ['http://localhost:5173'],
  });

  app.use(helmet());

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
