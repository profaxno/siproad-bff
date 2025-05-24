import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { BaseInventoryProductDto } from "../inventory-product.dto";

@InputType()
export class InventoryProductInput extends BaseInventoryProductDto {
  
  // companyId?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type( () => InventoryProductElementInput)
  @Field( () => [InventoryProductElementInput], {nullable: true})
  elementList?: InventoryProductElementInput[];

}

@InputType()
export class InventoryProductElementInput {
  
  @ValidateNested()
  @Type( () => InventoryProductInput)
  @Field( () => InventoryProductInput)
  element: InventoryProductInput;

  @IsNumber()
  @IsPositive()
  @Field( () => Number )
  qty: number;

}
