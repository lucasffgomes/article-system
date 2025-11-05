import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * `src/app.module.ts`: Módulo principal do aplicativo.
 * `src/app.controller.ts`: Define rotas e lida com requisições.
 * `src/app.service.ts`: Contém lógica de negócio, separado do controller.
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove props enviadas no body que nao estao no DTO
    }),
  );
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();
