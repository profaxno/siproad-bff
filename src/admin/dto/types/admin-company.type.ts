import { IsNumber } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseAdminCompanyDto } from "../admin-company.dto";

@ObjectType()
export class AdminCompanyType extends BaseAdminCompanyDto {
  @IsNumber()
  @Field( () => Number )
  stock: number; 
}