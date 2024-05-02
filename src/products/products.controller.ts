import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDTO } from 'src/common/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'createProductMessage' }, createProductDto);
  }

  @Get()
  async findAllProducts(@Query() paginationDTO: PaginationDTO) {
    return this.productsClient.send({ cmd: 'findAllProductsMessage' }, paginationDTO);
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const producto = await firstValueFrom(this.productsClient.send({ cmd: 'findOneProductMessage' }, { id }));
      return producto;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(@Body() updateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.productsClient.send({ cmd: 'updateProductMessage' }, { id, ...updateProductDto });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'deleteProductMessage' }, { id });
  }
}
