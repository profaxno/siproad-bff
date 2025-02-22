import { IsBoolean, IsOptional } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseAdminUserDto } from "../admin-user.dto";

@ObjectType()
export class AdminUserType extends BaseAdminUserDto {
  @IsBoolean()
  @IsOptional()
  @Field( () => Boolean )
  block?: boolean;
}
