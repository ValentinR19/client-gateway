import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  async createProduct() {
    return 'Crea un producto';
  }

  @Get()
  async findAllProducts() {
    return 'All products';
  }

  @Get(':id')
  async findProductById(@Param('id', ParseIntPipe) id: number) {
    return `One product by id : ${id}`;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return 'product eliminated';
  }

  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return `updated product by id : ${id} `;
  }
}
