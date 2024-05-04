import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './commons/infrastructure/filters/http-exception.filter';
import { TimeOutInterceptor } from './commons/infrastructure/interceptors/timeout.interceptor';
import { HttpInterceptor } from './commons/infrastructure/interceptors/http.interceptor';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new HttpInterceptor(), new TimeOutInterceptor())
  await app.listen(3000);
}
bootstrap();
