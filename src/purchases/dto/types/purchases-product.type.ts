import { Field, ObjectType } from "@nestjs/graphql";
import { BasePurchasesProductDto } from "../purchases-product.dto";
import { ResponseType } from "src/common/dto/types/response.type";

@ObjectType()
export class PurchasesProductType extends BasePurchasesProductDto {}

@ObjectType()
export class PurchasesProductResponseType extends ResponseType {
  @Field( () => [PurchasesProductType], {nullable: true})
  payload?: PurchasesProductType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: PurchasesProductType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}