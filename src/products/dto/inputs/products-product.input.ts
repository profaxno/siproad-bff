import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";
import { ProductsMovementInput } from "./products-movement.input";

@InputType()
export class ProductsProductInput extends BaseProductsProductDto {
  
  // companyId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type( () => ProductsProductElementInput)
  @Field( () => [ProductsProductElementInput], {nullable: true})
  elementList?: ProductsProductElementInput[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type( () => ProductsMovementInput)
  @Field( () => [ProductsMovementInput], {nullable: true})
  movementList?: ProductsMovementInput[];

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
