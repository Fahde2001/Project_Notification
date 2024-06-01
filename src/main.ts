import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000, () => {
    console.log('Nest application is listening on port 3000 over HTTP');
  });
}

bootstrap();
