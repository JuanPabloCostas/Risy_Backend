import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './core/interceptors/transform-response.interceptor';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestValidationPipeException } from './core/exceptions/badRequestPipe-exceptions';

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

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        // console.log("ERRORS WHY:", errors);
        const messages = errors.map(
          (error) =>
            `${error.property} - ${Object.values(error.constraints ? error.constraints : error.children).join(', ')}`,
        );
        console.log(messages);
        
        return new BadRequestValidationPipeException(messages);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 10000);
  console.log("App is listening on port", process.env.PORT ?? 10000);
  
}
bootstrap();
