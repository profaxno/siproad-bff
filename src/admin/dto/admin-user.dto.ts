import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";

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
  @MaxLength(255)
  @Field( () => String )
  password: string;

  constructor(companyId: string, name: string, email: string, password: string){
    this.companyId = companyId;
    this.name = name;
    this.email = email;
    this.password = password;
  }

}