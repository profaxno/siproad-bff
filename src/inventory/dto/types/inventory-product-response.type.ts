import { Field, ObjectType } from "@nestjs/graphql";
import { InventoryProductType } from "./inventory-product.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class InventoryProductResponseType extends ResponseType {
  @Field( () => [InventoryProductType], {nullable: true})
  payload?: InventoryProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: InventoryProductType[]) {
    super(internalCode, message, qty);
    this.payload = payload;
  }
}