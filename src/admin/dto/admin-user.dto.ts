import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
export class BaseAdminUserDto {
  
  @IsUUID()
  @IsOptional()
  @Field( () => String, { nullable: true } )
  id?: string;

  @IsUUID()
  @Field( () => String )
  companyId: string;

  @IsString()
  @MaxLength(90)
  @Field( () => String )
  name: string;

  @IsEmail()
  @MaxLength(45)
  @Field( () => String )
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Field( () => String )
  password: string;

  constructor(companyId: string, name: string, email: string, password: string){
    this.companyId = companyId;
    this.name = name;
    this.email = email;
    this.password = password;
  }

}