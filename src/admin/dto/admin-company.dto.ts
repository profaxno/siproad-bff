import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseAdminCompanyDto {
  
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