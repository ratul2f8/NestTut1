import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose']
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
    .setTitle('NestJS API docs')
    .setDescription('The description of the APIs')
    .setVersion('1.0')
    .build();
    
  const  document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
