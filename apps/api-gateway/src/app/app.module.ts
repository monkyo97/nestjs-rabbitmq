import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from '../constants/constant';


@Module({
  imports: [ClientsModule.register([
    {
      name: ORDER_SERVICE_RABBITMQ,
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://guest:guest@localhost:5672"], 
        queue: "order_queue",
        queueOptions: {
          durable: true,
        },
      },
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
