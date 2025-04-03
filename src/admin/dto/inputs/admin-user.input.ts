import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { BaseAdminUserDto } from "../admin-user.dto";
import { Type } from "class-transformer";

@InputType()
export class AdminUserInput extends BaseAdminUserDto {

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Field( () => String )
  password: string;
  
  @IsInt()
  @Min(0)
  @Field( () => Number )
  status: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserRoleInput)
  @Field( () => [UserRoleInput], { nullable: true } )
  roleList?: UserRoleInput[];

}

@InputType()
export class UserRoleInput {

  @IsString()
  @Field( () => String )
  id: string;

  @IsOptional()
  @IsString()
  @Field( () => String, { nullable: true } )
  name: string;
}