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
  @MaxLength(100)
  @Field( () => String )
  fullName: string;

  @IsEmail()
  @MaxLength(50)
  @Field( () => String )
  email: string;

  @IsString()
  @MaxLength(255)
  @Field( () => String )
  password: string;

  constructor(companyId: string, fullName: string, email: string, password: string){
    this.companyId = companyId;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

}