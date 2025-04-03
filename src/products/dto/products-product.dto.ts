import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

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
  @MaxLength(50)
  @Field( () => String )
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String )
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Field( () => String, { nullable: true })
  description: string;

  @IsNumber()
  @Field( () => Number )
  cost: number;

  @IsNumber()
  @Field( () => Number )
  price: number;

  @IsBoolean()
  @Field( () => Boolean )
  hasFormula: boolean;

}