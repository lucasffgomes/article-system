import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/**
 * `src/app.module.ts`: Módulo principal do aplicativo.
 * `src/app.controller.ts`: Define rotas e lida com requisições.
 * `src/app.service.ts`: Contém lógica de negócio, separado do controller.
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
