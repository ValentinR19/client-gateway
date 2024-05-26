import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'createProductMessage' }, createProductDto);
  }

  @Get()
  async findAllProducts(@Query() paginationDTO: any) {
    return this.client.send({ cmd: 'findAllProductsMessage' }, paginationDTO);
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const producto = await firstValueFrom(this.client.send({ cmd: 'findOneProductMessage' }, { id }));
      return producto;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.client.send({ cmd: 'updateProductMessage' }, { id, ...updateProductDto });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'deleteProductMessage' }, { id });
  }
}
