import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class AdminCompanyInput {
  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;
 
  @IsString()
  @MaxLength(45)
  @Field( () => String )
  name: string;
}