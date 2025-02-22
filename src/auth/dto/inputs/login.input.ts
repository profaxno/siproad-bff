import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Min, MinLength } from 'class-validator';

@InputType()
export class LoginInput {

  @IsEmail()
  @IsNotEmpty()
  @Field( () => String )
  email: string;

  @IsString()
  @MinLength(6)
  @Field( () => String )
  password: string;
}