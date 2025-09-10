import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseAdminUserDto } from "../admin-user.dto";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class AdminUserType extends BaseAdminUserDto {

  @Field(() => [UserRoleType], { nullable: true } )
  roleList: UserRoleType[];

  @Field(() => [UserPermissionType], { nullable: true } )
  permissionList?: UserPermissionType[];

  password: string;

  @Field( () => Number )
  status: number;
}

@ObjectType()
export class UserRoleType {
  @Field( () => String )
  id: string;

  @Field( () => String )
  name: string;
}

@ObjectType()
export class UserPermissionType {
  @Field( () => String )
  id: string;
  
  @Field( () => String )
  code: string
}

@ObjectType()
export class AdminUserResponseType extends ResponseType {

  @Field( () => [AdminUserType], {nullable: true})
  payload?: AdminUserType[];
}