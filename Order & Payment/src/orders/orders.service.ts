import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  async createOrder(data: { userId: number; items: { menuId: number; quantity: number }[]; totalPrice: number }) {
    const order = this.repo.create({
      user: { id: data.userId } as any,
      vendor: { id: 1 } as any,
      status: 'pending',
      items: data.items,
      totalPrice: data.totalPrice,
      paymentStatus: 'unpaid',
    });
    return this.repo.save(order);
  }

  async payOrder(orderId: number) {
    const order = await this.repo.findOne(orderId);
    if (order) {
      order.paymentStatus = 'paid';
      order.status = 'completed';
      return this.repo.save(order);
    }
    return null;
  }
}
