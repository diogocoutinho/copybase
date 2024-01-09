import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('CopyBase API')
    .setDescription(
      'Desenvolver uma aplicação web full-stack que permita aos usuários carregar uma planilha de dados de assinantes e visualizar métricas chave de negócios: Monthly Recurring Revenue (MRR) e Churn Rate (fique a vontade para trazer outras métricas, será um diferencial), em gráficos interativos.',
    )
    .setVersion('1.0')
    .addTag('users, subscribers, metrics')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
