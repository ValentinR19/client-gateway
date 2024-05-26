import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreatePaymentSessionDTO } from './dto/create-payment-session.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('create-payment-session')
  async createPaymentSession(@Body() createPaymentSessionDTO: CreatePaymentSessionDTO) {
    return this.client.send('create.payment.session', createPaymentSessionDTO);
  }

  @Get('success')
  async success() {
    return this.client.send('payment.success', {});
  }

  @Get('cancelled')
  async cancelled() {
    return this.client.send('payment.cancelled', {});
  }

  @Post('webhook')
  async stripeWebHook(@Req() req: Request, @Res() res: Response) {
    return this.client.send('payment.webhook', { req, res });
  }
}
