import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";
import { ProductsFormulaElementType } from "./products-formula.type";

@ObjectType()
export class ProductsProductType extends BaseProductsProductDto {
  
  @Field( () => String )
  companyId: string;

  @Field( () => [ProductsProductElementType], {nullable: true})
  elementList?: ProductsProductElementType[];

  @Field( () => [ProductsProductFormulaType], {nullable: true})
  formulaList?: ProductsProductFormulaType[];
}

@ObjectType()
export class ProductsProductElementType {
  @Field( () => String)
  id: string;

  @Field( () => Number )
  qty: number;

  @Field( () => String )
  name?: string;

  @Field( () => Number )
  cost?: number;

  @Field( () => String )
  unit?: string;
}

@ObjectType()
export class ProductsProductFormulaType {
  @Field( () => String)
  id: string;

  @Field( () => Number )
  qty: number;

  @Field( () => String )
  name?: string;

  @Field( () => Number )
  cost?: number;

  @Field( () => [ProductsFormulaElementType], { nullable: true} )
  elementList?: ProductsFormulaElementType[];
}