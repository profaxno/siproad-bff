import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";
import { BaseAdminUserDto } from "../admin-user.dto";

@InputType()
export class AdminUserInput extends BaseAdminUserDto {

  @IsBoolean()
  @IsOptional()
  @Field( () => Boolean )
  block?: boolean;

  constructor(companyId: string, fullName: string, email: string, password: string, block?: boolean){
    super(companyId, fullName, email, password);
    this.block = block;
  }
}