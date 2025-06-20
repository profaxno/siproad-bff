import { Field, ObjectType } from "@nestjs/graphql";
import { PurchasesProductType } from "./purchases-product.type";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class PurchasesProductResponseType extends ResponseType{
  @Field( () => [PurchasesProductType], {nullable: true})
  payload?: PurchasesProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: PurchasesProductType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}