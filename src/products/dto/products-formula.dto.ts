import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

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
  @MaxLength(50)
  @Field( () => String )
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Field( () => String )
  code: string;

  @IsNumber()
  @Field( () => Number )
  cost: number;
  
}
