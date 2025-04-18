import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseAdminUserDto {
  
  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsString()
  @MaxLength(50)
  @Field( () => String )
  name: string;

  @IsEmail()
  @MaxLength(50)
  @Field( () => String )
  email: string;

}