import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";
import { MeasuresEnum } from "../enum/measures.enum";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseProductsElementDto {
  
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

  @IsNumber()
  @Field( () => Number )
  stock: number;

}

@ObjectType()
export class ProductsElementDto extends BaseProductsElementDto {
  @IsIn([MeasuresEnum.UN, MeasuresEnum.KG])
  @Field( () => String )
  unit: string;  
}

@InputType()
export class InputProductsElementDto extends BaseProductsElementDto {
  @IsIn([MeasuresEnum.UN, MeasuresEnum.KG])
  @Field( () => String )
  unit: string;
}