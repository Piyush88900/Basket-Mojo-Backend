import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() body: { userId: number; items: { menuId: number; quantity: number }[]; totalPrice: number }) {
    return this.ordersService.createOrder(body);
  }

  @Put(':id/pay')
  async pay(@Param('id') id: string) {
    return this.ordersService.payOrder(+id);
  }
}
