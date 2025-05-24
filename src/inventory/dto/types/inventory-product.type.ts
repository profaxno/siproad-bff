import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseInventoryProductDto } from "../inventory-product.dto";

@ObjectType()
export class InventoryProductType extends BaseInventoryProductDto {
  
  // @Field( () => String )
  // companyId: string;

  @Field( () => [InventoryProductElementType], {nullable: true})
  elementList?: InventoryProductElementType[];

}

@ObjectType()
export class InventoryProductElementType {
  
  @Field( () => InventoryProductType)
  element: InventoryProductType;

  @Field( () => Number )
  qty: number;

}