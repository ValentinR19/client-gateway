import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common';
import { StatusDTO } from './dto/change-state-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.ordersClient.send({ cmd: 'findAllOrder' }, { paginationDTO });
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
