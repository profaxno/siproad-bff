import { Field, ObjectType } from "@nestjs/graphql";
import { PurchasesOrderType } from "./purchases-order.type";
import { ResponseType } from "src/common/dto/types/response.type";

// * formulas
@ObjectType()
export class PurchasesOrderResponseType extends ResponseType{
  @Field( () => [PurchasesOrderType], {nullable: true})
  payload?: PurchasesOrderType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: PurchasesOrderType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}