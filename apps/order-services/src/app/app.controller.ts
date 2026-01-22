import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constants/constant';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentRMQClient: ClientProxy,
    @Inject(NOTIFICATION_CLIENT) private readonly notificationRMQClient: ClientProxy
  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order_created')
  handleOrderCreated(@Payload() order: any) {
    //Simulate processing order
    console.log('[Order-service]: Received new order', order);

    this.paymentRMQClient.emit('process_payment', order);
    this.notificationRMQClient.emit('order_created', order);
  }
}
