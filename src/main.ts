import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  let port = 4000;
  await app.listen(port, () => {
    console.log(`open in http://localhost:${port}/api`);
  });
}
bootstrap();
