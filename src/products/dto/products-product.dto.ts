import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { InputProductsFormulaElementDto, ProductsFormulaElementDto } from "./products-formula.dto";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseProductsProductDto {

  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsUUID()
  @Field( () => String )
  companyId: string;

  @IsString()
  @MaxLength(45)
  @Field( () => String )
  name: string;

  @IsString()
  @MaxLength(255)
  @Field( () => String )
  description: string;

  @IsNumber()
  @Field( () => Number )
  cost: number;

  @IsNumber()
  @Field( () => Number )
  price: number;
}

@ObjectType()
export class ProductsProductDto extends BaseProductsProductDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsProductFormulaDto)
  @Field( () => [ProductsProductFormulaDto], {nullable: true})
  formulaList?: ProductsProductFormulaDto[];
}

@InputType()
export class InputProductsProductDto extends BaseProductsProductDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InputProductsProductFormulaDto)
  @Field( () => [InputProductsProductFormulaDto], { nullable: true} )
  formulaList?: InputProductsProductFormulaDto[];
}

@ObjectType()
export class ProductsProductFormulaDto {
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
  @Type(() => ProductsFormulaElementDto)
  @Field( () => [ProductsFormulaElementDto], { nullable: true} )
  elementList?: ProductsFormulaElementDto[];
}

@InputType()
export class InputProductsProductFormulaDto {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @Field( () => Number )
  qty: number;

  @IsString()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  name?: string;
}
