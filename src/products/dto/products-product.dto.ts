import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { UnitMeasuresEnum } from "../enums/unit-measures.enum";
// import { ProductTypeEnum } from "../enums/product-type.enum";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseProductsProductDto {

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsString()
  @MaxLength(100)
  @Field( () => String )
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Field( () => String, { nullable: true } )
  description?: string;

  @IsOptional()
  @IsIn([UnitMeasuresEnum.UN, UnitMeasuresEnum.KG])
  @MaxLength(5)
  @Field( () => String, { nullable: true } )
  unit?: string;

  @IsNumber()
  @Field( () => Number )
  cost: number;

  @IsOptional()
  @IsNumber()
  @Field( () => Number, { nullable: true } )
  price?: number;

  @IsNumber()
  @Field( () => Number )
  type: number;

  @IsBoolean()
  @Field( () => Boolean )
  enable4Sale: boolean;

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true } )
  companyId?: string;

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true } )
  productCategoryId?: string;

  @IsOptional()
  @IsUUID()
  @Field( () => String, { nullable: true } )
  productUnitId?: string;

}