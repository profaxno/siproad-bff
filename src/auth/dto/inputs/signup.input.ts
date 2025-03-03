import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Min, MinLength } from 'class-validator';

@InputType()
export class SignupInput {

  @IsUUID()
  @Field( () => String )
  companyId: string;

  @IsString()
  @IsNotEmpty()
  @Field( () => String )
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field( () => String )
  email: string;

  @IsString()
  @MinLength(6)
  @Field( () => String )
  password: string;
}