import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseAdminUserDto } from "../admin-user.dto";
import { Type } from "class-transformer";

@ObjectType()
export class AdminUserType extends BaseAdminUserDto {
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type( () => UserRoleDto)
  @Field(() => UserRoleDto, { nullable: true } )
  roleList?: UserRoleDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type( () => UserPermissionDto)
  @Field(() => UserPermissionDto, { nullable: true } )
  permissionList?: UserPermissionDto[];

  @IsInt()
  @IsOptional()
  @Field( () => Number )
  status?: number;
}

@ObjectType()
export class UserRoleDto {
  @IsUUID()
  @Field( () => String, { nullable: true } )
  id: string;
}

@ObjectType()
export class UserPermissionDto {
  @IsUUID()
  @Field( () => String, { nullable: true } )
  id: string;

  @IsString()
  @Field( () => String, { nullable: true } )
  code: string
}