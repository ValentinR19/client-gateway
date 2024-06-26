import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
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
      return firstValueFrom(this.client.send('login.user', payload));
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyUser(@User() user: CurrentUser, @Token() token: string) {
    try {
      return { user, token };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
