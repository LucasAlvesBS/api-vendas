import { IsDecimal, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;
}
