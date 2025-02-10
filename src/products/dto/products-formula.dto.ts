import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseProductsFormulaDto {

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

  @IsNumber()
  @Field( () => Number )
  cost: number;
}

@ObjectType()
export class ProductsFormulaDto extends BaseProductsFormulaDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductsFormulaElementDto)
  @Field( () => [ProductsFormulaElementDto], {nullable: true})
  elementList?: ProductsFormulaElementDto[];
}

@InputType()
export class InputProductsFormulaDto extends BaseProductsFormulaDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InputProductsFormulaElementDto)
  @Field( () => [InputProductsFormulaElementDto], { nullable: true} )
  elementList?: InputProductsFormulaElementDto[];
}

// * ---
@ObjectType()
export class ProductsFormulaElementDto {
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

@InputType()
export class InputProductsFormulaElementDto {
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
