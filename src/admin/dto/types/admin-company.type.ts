import { IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AdminCompanyType {
  
  @Field( () => String )
  id?: string;
  
  @MaxLength(45)
  @Field( () => String )
  name: string;
}