import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";

@ObjectType()
export class ProductsProductType extends BaseProductsProductDto {
  
  // @Field( () => String )
  // companyId: string;

  @Field( () => [ProductsProductElementType], {nullable: true})
  elementList?: ProductsProductElementType[];

}

@ObjectType()
export class ProductsProductElementType {
  
  @Field( () => ProductsProductType)
  element: ProductsProductType;

  @Field( () => Number )
  qty: number;

}