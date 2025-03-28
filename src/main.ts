import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    }
  );

  await app.listen(process.env.PORT ?? 10000);
  console.log("App is listening on port", process.env.PORT ?? 10000);
  
}
bootstrap();
