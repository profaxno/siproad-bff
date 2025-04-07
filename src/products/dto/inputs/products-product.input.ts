import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { BaseProductsProductDto } from "../products-product.dto";

@InputType()
export class ProductsProductInput extends BaseProductsProductDto {
  
  companyId?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsProductElementInput)
  @Field( () => [ProductsProductElementInput], {nullable: true})
  elementList?: ProductsProductElementInput[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsProductFormulaInput)
  @Field( () => [ProductsProductFormulaInput], { nullable: true} )
  formulaList?: ProductsProductFormulaInput[];
}

@InputType()
export class ProductsProductElementInput {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

  @IsString()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  name?: string;

}

@InputType()
export class ProductsProductFormulaInput {
  @IsUUID()
  @Field( () => String)
  id: string;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

  @IsString()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  name?: string;
}
