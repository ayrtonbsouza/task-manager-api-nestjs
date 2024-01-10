import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription(
      `This API was built as part of the challenge I committed to completing.
      The challenge is to develop the same API in different programming languages,
      using different frameworks and ORMs. This version was written using Typescript,
      using NestJS as the framework and Prisma as ORM.`,
    )
    .setContact('Ayrton Souza', 'https://ayrtonsouza.com', 'me@ayrtonsouza.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
