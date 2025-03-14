import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

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