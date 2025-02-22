import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { BaseProductsFormulaDto } from "../products-formula.dto";

@InputType()
export class ProductsFormulaInput extends BaseProductsFormulaDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsFormulaElementInput)
  @Field( () => [ProductsFormulaElementInput], { nullable: true} )
  elementList?: ProductsFormulaElementInput[];
}

@InputType()
export class ProductsFormulaElementInput {
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