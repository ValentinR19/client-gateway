import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { ORDER_STATUS } from '../enum/order-status.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum([ORDER_STATUS.PENDING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED], { message: `El valor del campo status es invalido` })
  @IsOptional()
  status: ORDER_STATUS;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
