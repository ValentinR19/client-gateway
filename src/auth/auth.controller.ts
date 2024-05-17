import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() payload: RegisterUserDto) {
    try {
      return firstValueFrom(this.client.send('auth.register.user', payload));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async login(@Body() payload: LoginUserDto) {
    try {
      return firstValueFrom(this.client.send('auth.register.user', payload));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyUser() {
    try {
      return firstValueFrom(this.client.send('auth.register.user', {}));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
