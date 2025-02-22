import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { BaseAdminCompanyDto } from "../admin-company.dto";

@InputType()
export class AdminCompanyInput extends BaseAdminCompanyDto {
  @IsNumber()
  @Field( () => Number )
  stock: number;
}