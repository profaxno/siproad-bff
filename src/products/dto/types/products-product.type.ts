import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";
import { ProductsFormulaElementType } from "./products-formula.type";

@ObjectType()
export class ProductsProductType extends BaseProductsProductDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsProductElementType)
  @Field( () => [ProductsProductElementType], {nullable: true})
  elementList?: ProductsProductElementType[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsProductFormulaType)
  @Field( () => [ProductsProductFormulaType], {nullable: true})
  formulaList?: ProductsProductFormulaType[];
}

@ObjectType()
export class ProductsProductElementType {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @Field( () => Number )
  qty: number;

  @IsString()
  @IsOptional()
  @Field( () => String )
  name?: string;

  @IsNumber()
  @IsOptional()
  @Field( () => Number )
  cost?: number;

  @IsString()
  @IsOptional()
  @Field( () => String )
  unit?: string;
}

@ObjectType()
export class ProductsProductFormulaType {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @Field( () => Number )
  qty: number;

  @IsString()
  @IsOptional()
  @Field( () => String )
  name?: string;

  @IsNumber()
  @IsOptional()
  @Field( () => Number )
  cost?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsFormulaElementType)
  @Field( () => [ProductsFormulaElementType], { nullable: true} )
  elementList?: ProductsFormulaElementType[];
}