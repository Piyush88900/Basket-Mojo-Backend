import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(email: string, password: string, name: string) {
    const hashed = bcrypt.hashSync(password, 10);
    const user = this.repo.create({ email, password: hashed, name, isVerified: false });
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.findByEmail(email);
    if (user && user.otp === otp) {
      user.isVerified = true;
      user.otp = null;
      return this.repo.save(user);
    }
    return null;
  }
}
