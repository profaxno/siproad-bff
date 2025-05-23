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

  // app.enableCors({
  //   origin: [
  //     'http://localhost:5173',
  //     '*'
  //   ],
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    // credentials: true
  });

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
