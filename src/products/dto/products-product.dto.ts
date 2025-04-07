import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseProductsProductDto {

  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsString()
  @MaxLength(50)
  @Field( () => String )
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field( () => String, { nullable: true } )
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Field( () => String, { nullable: true } )
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

  @IsBoolean()
  @Field( () => Boolean )
  active: boolean;
}