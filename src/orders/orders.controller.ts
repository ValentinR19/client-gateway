import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';
import { StatusDTO } from './dto/change-state-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  async findAll(@Query() paginationDTO: PaginationDTO) {
    try {
      const orders = await this.ordersClient.send({ cmd: 'findAllOrder' }, { paginationDTO });
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const orden = await firstValueFrom(this.ordersClient.send({ cmd: 'findOneOrder' }, id));
      return orden;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(@Param('id', ParseIntPipe) id: number, @Body() statusDTO: StatusDTO) {
    return this.ordersClient.send({ cmd: 'changeOrderStatus' }, { id, ...statusDTO });
  }
}
