import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Vendor } from '../vendors/vendor.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column()
  status: string; // pending, completed

  @Column('simple-json')
  items: { menuId: number; quantity: number }[];

  @Column('decimal')
  totalPrice: number;

  @Column()
  paymentStatus: string; // paid, unpaid
}
