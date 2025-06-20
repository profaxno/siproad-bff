import { Field, ObjectType } from "@nestjs/graphql";
import { PurchasesTypeType } from "./purchases-type.type";
import { ResponseType } from "src/common/dto/types/response.type";

// * formulas
@ObjectType()
export class PurchasesTypeResponseType extends ResponseType{
  @Field( () => [PurchasesTypeType], {nullable: true})
  payload?: PurchasesTypeType[];

  constructor(internalCode: number, message: string, qty?: number, payload?: PurchasesTypeType[]){
    super(internalCode, message, qty);
    this.payload = payload;
  
  }
}