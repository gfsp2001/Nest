import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabiitMQ } from './common/constants';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabiitMQ.PassengerQueue
    }
  });
  await app.listen();
  console.log('Microservice Passengers is listening');
}
bootstrap();
