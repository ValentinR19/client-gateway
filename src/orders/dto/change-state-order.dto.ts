import { ORDER_STATUS } from '../enum/order-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class StatusDTO {
  @IsOptional()
  @IsEnum([ORDER_STATUS.PENDING, ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED], { message: 'El tipo de dato es incorrecto' })
  status: ORDER_STATUS;
}
