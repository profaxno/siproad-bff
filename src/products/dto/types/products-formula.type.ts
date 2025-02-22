import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseProductsFormulaDto } from "../products-formula.dto";

@ObjectType()
export class ProductsFormulaType extends BaseProductsFormulaDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsFormulaElementType)
  @Field( () => [ProductsFormulaElementType], {nullable: true})
  elementList?: ProductsFormulaElementType[];
}

@ObjectType()
export class ProductsFormulaElementType {
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