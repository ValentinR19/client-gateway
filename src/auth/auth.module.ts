import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [NatsModule],
})
export class AuthModule {}
