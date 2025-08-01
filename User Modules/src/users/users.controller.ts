import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    const user = await this.usersService.createUser(body.email, body.password, body.name);
    // Send OTP email here
    return { message: 'User registered, verify email', userId: user.id };
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string; otp: string }) {
    const user = await this.usersService.verifyOtp(body.email, body.otp);
    if (user) return { message: 'Email verified' };
    return { message: 'Invalid OTP' };
  }
}
