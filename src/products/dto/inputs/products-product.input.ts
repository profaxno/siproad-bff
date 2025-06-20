import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";

@InputType()
export class ProductsProductInput extends BaseProductsProductDto {
  
  // companyId?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type( () => ProductsProductElementInput)
  @Field( () => [ProductsProductElementInput], {nullable: true})
  elementList?: ProductsProductElementInput[];

}

@InputType()
export class ProductsProductElementInput {
  
  @ValidateNested()
  @Type( () => ProductsProductInput)
  @Field( () => ProductsProductInput)
  element: ProductsProductInput;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

}
