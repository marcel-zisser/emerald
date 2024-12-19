/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser()); // Enable cookie parsing

  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app URL
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  dotenv.config();

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
