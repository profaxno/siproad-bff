import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { BaseAdminUserDto } from "../admin-user.dto";

@InputType()
export class AdminUserInput extends BaseAdminUserDto {

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field( () => Number, { nullable: true } )
  status?: number;

  constructor(companyId: string, name: string, email: string, password: string, status?: number){
    super(companyId, name, email, password);
    this.status = status;
  }
}