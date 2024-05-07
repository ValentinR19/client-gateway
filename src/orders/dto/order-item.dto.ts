import { IsNumber, IsPositive } from 'class-validator';

export class OrderItemDTO  {
  @IsNumber()
  @IsPositive()
  idProduct: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
