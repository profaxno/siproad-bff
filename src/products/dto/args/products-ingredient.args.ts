import { Args, ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsOptional } from "class-validator";

@ArgsType()
export class ProductsElementArgs {

  @IsOptional()
  @IsArray()
  @Field( () => [String], { nullable: true } )
  nameList: string[];
}