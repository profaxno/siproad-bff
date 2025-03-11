import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(process.env.PORT);
  
  const env = process.env.ENV.padEnd(20, ' ');

  console.log(`
╔════════════════════════════╗
║ @org: Profaxno Company     ║
║ @app: siproad-bff          ║
║ @env: ${env} ║
╚════════════════════════════╝

running at PORT: ${process.env.PORT}...`
  );
}
bootstrap();
